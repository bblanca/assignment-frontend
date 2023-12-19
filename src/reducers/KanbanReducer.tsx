import { IKanbanBoard, IKanbanItem, IKanbanList } from '../data/KanbanDefinitions'
import { StateAction } from '../actions/KanbanActions'

export const stateReducer = (state: IKanbanBoard, action: StateAction): IKanbanBoard => {
  switch (action.type) {
    case 'moveItem': {
      const { list, itemIndex, listIndex } = getItemInfo(action.payload.itemId, state.lists)
      const destinationListIndex = state.lists.findIndex(list => list.id === action.payload.destinationListId)
      if (listIndex === -1) throw new Error('List was not found')

      const destinationList = state.lists[destinationListIndex]
      const newItems = Array.from(list.items)
      const [removedItem] = newItems.splice(itemIndex, 1)

      if (list.id === destinationList.id) {
        /*update state with added item to list at new position*/
        newItems.splice(action.payload.destinationIndexWithinList, 0, removedItem)
        return replaceListItems(state, listIndex, newItems)
      } else {
        /*update state with removed item from source list*/
        const stateWithUpdatedSourceList = replaceListItems(state, listIndex, newItems)

        /*update state with added item to destination list*/
        const newDestinationItems = Array.from(state.lists[destinationListIndex].items)
        newDestinationItems.splice(action.payload.destinationIndexWithinList, 0, removedItem)

        return replaceListItems(stateWithUpdatedSourceList, destinationListIndex, newDestinationItems)
      }
      break
    }

    case 'addEmptyItemToList': {
      const item = {
        id: action.payload.itemId,
        content: '',
      }

      const listIndex = state.lists.findIndex(list => list.id === action.payload.listId)
      if (listIndex === -1) throw new Error('List was not found')

      const newListItems = Array.from(state.lists[listIndex].items)
      newListItems.push(item)

      return replaceListItems(state, listIndex, newListItems)
    }

    case 'updateItemText': {
      const { item, itemIndex, listIndex } = getItemInfo(action.payload.itemId, state.lists)

      const newItem = {
        ...item,
        content: action.payload.itemText,
      }
      const newListItems = Array.from(state.lists[listIndex].items)
      newListItems[itemIndex] = newItem

      return replaceListItems(state, listIndex, newListItems)
    }

    default:
      throw new Error(`Action type: ${(action as any).type} does not exist`)
  }
}

interface ItemInfo {
  item: IKanbanItem
  list: IKanbanList
  itemIndex: number
  listIndex: number
}
const getItemInfo = (itemId: string, lists: IKanbanList[]): ItemInfo => {
  //efficiency could be improved (lookup table)
  for (let listIndex = 0; listIndex < lists.length; listIndex++) {
    let list = lists[listIndex]
    for (let itemIndex = 0; itemIndex < list.items.length; itemIndex++) {
      let item = list.items[itemIndex]
      if (item.id === itemId) {
        return { item, list, itemIndex, listIndex }
      }
    }
  }
  throw new Error('Item was not found')
}

const replaceListItems = (state: IKanbanBoard, listIndex: number, newItems: IKanbanItem[]): IKanbanBoard => {
  const newList = {
    ...state.lists[listIndex],
    items: newItems,
  }

  const newState: IKanbanBoard = {
    lists: Array.from(state.lists),
  }
  newState.lists[listIndex] = newList

  return newState
}
