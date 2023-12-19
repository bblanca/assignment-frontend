


export const enum StateActionType {
  moveItem,   
  addItemToList,      
  updateItemText,    
}

interface MoveItemAction {
  type: StateActionType.moveItem
  payload: {
    itemId: string
    destinationListId: string
    destinationIndexWithinList: number
  }
}

interface AddItemToList {
  type: StateActionType.addItemToList
  payload: {
    listId: string
  }
}

interface UpdateItemText {
  type: StateActionType.updateItemText
  payload: {
    itemId: string
    itemText: string
  }
}

export type StateAction = MoveItemAction | AddItemToList | UpdateItemText ;