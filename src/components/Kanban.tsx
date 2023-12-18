import { Box, Stack } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useReducer, useEffect, useState } from 'react';
import { KanbanList } from './KanbanList';
import { initialData } from '../initial-data';
import { STATE_ACTION_TYPE, stateReducer } from '../reducers/kanban.reducer';
import { StateContext, StateDispatchContext } from '../contexts/kanban.context';

export function Kanban() {
  const [initDatafinished, setInitDatafinished] = useState(false);
  const [state, dispatch] = useReducer(stateReducer, initialData);

  useEffect(() => {
    initialData.lists.map((list) => {
      list.items.map((item) => {
        item.id = uuidv4();
      });
    });

    dispatch({ type: STATE_ACTION_TYPE.SET_STATE, payload: { newState: initialData } });
    setInitDatafinished(true);

  }, []);

  const onDragEnd = ({ destination, source, draggableId }: DropResult) => {

    if (!destination ||
      (destination.droppableId === source.droppableId && destination.index === source.index))
      return

    if (destination.droppableId === source.droppableId) {
      const listIndex = state.lists.findIndex((element) => element.id === source.droppableId);
      if (listIndex === -1) throw new Error();

      const newItems = Array.from(state.lists[listIndex].items);
      const removedElement = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, removedElement[0]);

      dispatch({ type: STATE_ACTION_TYPE.SET_LIST_ITEMS, payload: { newListItems: newItems, listIndex: listIndex } });

    }
    else {
      /*remove dragged item from source list*/
      const sourceListIndex = state.lists.findIndex((element) => element.id === source.droppableId);
      if (sourceListIndex === -1) throw new Error();

      const newSourceItems = Array.from(state.lists[sourceListIndex].items);
      const removedElement = newSourceItems.splice(source.index, 1);

      dispatch({ type: STATE_ACTION_TYPE.SET_LIST_ITEMS, payload: { newListItems: newSourceItems, listIndex: sourceListIndex } });

      /*insert dragged item to destination list*/
      const destinationListIndex = state.lists.findIndex((element) => element.id === destination.droppableId);
      if (destinationListIndex === -1) throw new Error();

      const newDestinationItems = Array.from(state.lists[destinationListIndex].items);
      newDestinationItems.splice(destination.index, 0, removedElement[0]);

      dispatch({ type: STATE_ACTION_TYPE.SET_LIST_ITEMS, payload: { newListItems: newDestinationItems, listIndex: destinationListIndex } });
    }
  };


  return (
    <StateContext.Provider value={state}>
      <StateDispatchContext.Provider value={dispatch}>
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{ paddingBottom: 4 }}>
        <Stack spacing={2} margin={5} direction="row" alignItems="flex-start">{ //'flex-start' enables individually adjusted heights of KanbanLists
          initDatafinished && state.lists.map((list) => (
            <KanbanList key={list.id} listId={list.id} />) 
          )
        }
        </Stack>
      </Box>
    </DragDropContext>
      </StateDispatchContext.Provider>
    </StateContext.Provider>
  );
}

