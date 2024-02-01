interface MoveItem {
  type: 'moveItem'
  payload: {
    itemId: string
    destinationListId: string
    destinationIndexWithinList: number
  }
}

interface AddEmptyItemToList {
  type: 'addEmptyItemToList'
  payload: {
    listId: string
    itemId: string
  }
}

interface UpdateItemText {
  type: 'updateItemText'
  payload: {
    itemId: string
    itemText: string
  }
}

export type StateAction = MoveItem | AddEmptyItemToList | UpdateItemText
