import { IKanbanBoard,  IKanbanList } from '../data/KanbanDefinitions'
import { StateAction } from '../actions/KanbanActions'


export const stateReducer = (draft: IKanbanBoard, action: StateAction)  => {
  switch (action.type) {
    case 'moveItem': {
      const { itemIndex, listIndex } = getItemInfo(action.payload.itemId, draft.lists)
      const [removedItem] = draft.lists[listIndex].items.splice(itemIndex, 1)

      const destinationList = draft.lists.find(list => list.id === action.payload.destinationListId)
      if (!destinationList) throw new Error('List was not found')
      destinationList.items.splice(action.payload.destinationIndexWithinList, 0, removedItem)

      return
    }

    case 'addEmptyItemToList': {
      const item = {
        id: action.payload.itemId,
        content: '',
      }

      const list = draft.lists.find(list => list.id === action.payload.listId)
      if (!list) throw new Error('List was not found')
      list.items.push(item);

      return
    }

    case 'updateItemText': {
      const { itemIndex, listIndex } = getItemInfo(action.payload.itemId, draft.lists)
      draft.lists[listIndex].items[itemIndex].content = action.payload.itemText
      return
    }

    default:
      throw new Error(`Action type: ${(action as any).type} does not exist`)
  }
}

interface ItemInfo {
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
        return { itemIndex, listIndex }
      }
    }
  }
  throw new Error('Item was not found')
}
