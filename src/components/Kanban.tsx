import { Box, Stack } from '@mui/material';

import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useReducer } from 'react';
import { KanbanList } from './KanbanList';
import { stateReducer } from '../reducers/KanbanReducer';
import {  StateDispatchContext } from '../contexts/KanbanContexts';
import { initialData } from '../data/InitialData';
import { StateActionType } from '../actions/KanbanActions';

export function Kanban() {
  const [state, dispatch] = useReducer(stateReducer, initialData);


  const onDragEnd = ({ destination, source, draggableId }: DropResult) => { 
    if (!destination ||
      (destination.droppableId === source.droppableId && destination.index === source.index)) //fixme can I leave this here
      return

      dispatch({ type: StateActionType.moveItem, payload: {itemId: draggableId, destinationListId: destination.droppableId, destinationIndexWithinList: destination.index } });
  };


  return (
    <StateDispatchContext.Provider value={dispatch}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{ paddingBottom: 4 }}>
          <Stack spacing={2} margin={5} direction="row" alignItems="flex-start">{ //'flex-start' enables individually adjusted heights of KanbanLists
              state.lists.map((list) => (
              <KanbanList key={list.id} list={list} />) 
            )
          }
          </Stack>
        </Box>
      </DragDropContext>
    </StateDispatchContext.Provider>
  );
}

