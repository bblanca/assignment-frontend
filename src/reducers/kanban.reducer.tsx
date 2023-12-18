import { IKanban, IKanbanItem } from '../initial-data';

export const enum STATE_ACTION_TYPE {
  SET_LIST_ITEMS,     //update the items array of a list
  PUSH_ITEM,          //push a new item to the end of a list
  SET_ITEM,           //update an item
  SET_STATE,           //update the state
}

export type stateAction = {
  type: STATE_ACTION_TYPE;
  payload: {
    newState?: IKanban;
    newListItems?: IKanbanItem[];
    newItem?: IKanbanItem;
    listIndex?: number;
    itemIndex?: number;
  };
};

export const stateReducer = (state: IKanban, action: stateAction): IKanban => {
  switch (action.type) {
    case STATE_ACTION_TYPE.SET_STATE:
      return action.payload.newState ?? state;

    case STATE_ACTION_TYPE.SET_LIST_ITEMS:
      if (action.payload.newListItems === undefined || action.payload.listIndex === undefined)
        throw new Error();

      var newListItems = action.payload.newListItems;
      var listIndex = action.payload.listIndex;

      var newList = {
        ...state.lists[listIndex],
        items: newListItems,
      };

      var newState = { ...state };
      newState.lists[listIndex] = newList;

      return newState;

    case STATE_ACTION_TYPE.PUSH_ITEM:
      if (action.payload.newItem === undefined || action.payload.listIndex === undefined)
        throw new Error();

      var listIndex = action.payload.listIndex;
      var newListItems = [...state.lists[listIndex].items, action.payload.newItem];
      var newList = {
        ...state.lists[listIndex],
        items: newListItems,
      };

      var newState = { ...state };
      newState.lists[listIndex] = newList;

      return newState;

    case STATE_ACTION_TYPE.SET_ITEM:
      if (action.payload.newItem === undefined || action.payload.listIndex === undefined || action.payload.itemIndex === undefined)
        throw new Error();

      var listIndex = action.payload.listIndex;
      var newItem = action.payload.newItem;
      var itemIndex = action.payload.itemIndex;

      var newListItems = Array.from(state.lists[listIndex].items);
      newListItems[itemIndex] = newItem;

      var newList = {
        ...state.lists[listIndex],
        items: newListItems,
      };

      var newState = { ...state };
      newState.lists[listIndex] = newList;

      return newState;

    default:
      throw new Error();
  }
};
