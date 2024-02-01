import { Box, Stack } from '@mui/material'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useImmerReducer } from "use-immer";
import { KanbanList } from './KanbanList'
import { stateReducer } from '../reducers/KanbanReducer'
import { StateDispatchContext } from '../contexts/KanbanContexts'
import { initialData } from '../data/InitialData'

export function Kanban() {
  const [state, dispatch] = useImmerReducer(stateReducer, initialData)

  const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) return

    dispatch({
      type: 'moveItem',
      payload: {
        itemId: draggableId,
        destinationListId: destination.droppableId,
        destinationIndexWithinList: destination.index,
      },
    })
  }

  return (
    <StateDispatchContext.Provider value={dispatch}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{ paddingBottom: 4 }}>
          <Stack
            spacing={2}
            margin={5}
            direction="row"
            alignItems="flex-start" //enables individually adjusted heights of KanbanLists
          >
            {state.lists.map(list => (
              <KanbanList key={list.id} list={list} />
            ))}
          </Stack>
        </Box>
      </DragDropContext>
    </StateDispatchContext.Provider>
  )
}
