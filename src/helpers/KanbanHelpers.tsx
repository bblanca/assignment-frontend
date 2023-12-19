import { IKanbanBoard, IKanbanItem, IKanbanList } from "../data/KanbanDefinitions";



export const getItemInfo = (itemId: string, lists: IKanbanList[]): {item:IKanbanItem, list: IKanbanList, itemIndex: number, listIndex: number} => {
    for (var listIndex=0; listIndex<lists.length; listIndex++){
        let list = lists[listIndex];
        for (var itemIndex=0; itemIndex< list.items.length; itemIndex++)
        {
        let item = list.items[itemIndex]
        if(item.id === itemId)
        {
            return {item, list, itemIndex, listIndex}
        }
        }
    }
    throw new Error('Item was not found');
}

export const updateListItems = (state: IKanbanBoard, listIndex: number, newItems: IKanbanItem[]) : IKanbanBoard => {

    const newList = {
      ...state.lists[listIndex],
      items: newItems,
    };
  
    const newState = { ...state };
    newState.lists[listIndex] = newList;
  
    return newState;
  }
  
