import { IKanbanBoard } from '../data/KanbanDefinitions';
import { StateAction, StateActionType} from '../actions/KanbanActions';
import { v4 as uuidv4 } from 'uuid';
import { getItemInfo, updateListItems } from '../helpers/KanbanHelpers';


export const stateReducer = (state: IKanbanBoard, action: StateAction): IKanbanBoard => {
  
  switch (action.type) {
    case StateActionType.moveItem:

      var {item, list, itemIndex, listIndex} = getItemInfo(action.payload.itemId, state.lists);
      const destinationListIndex = state.lists.findIndex(list => list.id === action.payload.destinationListId); 
      if(listIndex === -1) throw new Error();

      const destinationList = state.lists[destinationListIndex];
      const newItems = Array.from(list.items);
      const removedElement = newItems.splice(itemIndex, 1);


      if (list.id === destinationList.id) {
        /*update state with added item to list at new position*/
        newItems.splice(action.payload.destinationIndexWithinList, 0, removedElement[0]);
        return updateListItems(state, listIndex, newItems);

      }else{
        /*update state with removed item from source list*/
        const StateWithUpdatedSourceList = updateListItems(state, listIndex, newItems);

        /*update state with added item to destination list*/
        const newDestinationItems = Array.from(state.lists[destinationListIndex].items);
        newDestinationItems.splice(action.payload.destinationIndexWithinList, 0, removedElement[0]);

        return updateListItems(StateWithUpdatedSourceList, destinationListIndex, newDestinationItems)
      }
      break;

    case StateActionType.addItemToList:
      
      item = {
        id: uuidv4(),
        content: '',
      };

      listIndex = state.lists.findIndex(list => list.id === action.payload.listId)
      if (listIndex === -1) throw new Error();

      var newListItems = Array.from(state.lists[listIndex].items);
      newListItems.push(item)

      return updateListItems(state, listIndex, newListItems);

    case StateActionType.updateItemText:
      
      var {item, list, itemIndex, listIndex} = getItemInfo(action.payload.itemId, state.lists);
    
      const newItem = {
        ...item, 
        content: action.payload.itemText
      }
      var newListItems = Array.from(state.lists[listIndex].items);
      newListItems[itemIndex] = newItem;

      return updateListItems(state, listIndex, newListItems);

    default:
      throw new Error();
  }
};
