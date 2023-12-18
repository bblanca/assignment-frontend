import { Button, Card, CardContent, Stack, } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { BaseSyntheticEvent, useContext } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { KanbanItem } from './KanbanItem';
import { IKanban, IKanbanItem } from '../initial-data';
import { v4 as uuidv4 } from 'uuid';
import { STATE_ACTION_TYPE, stateAction } from '../reducers/kanban.reducer';
import { useStateContext, useStateDispatchContext } from '../contexts/kanban.context';

interface KanbanListProps {
  listId: string;
}

export function KanbanList({ listId }: KanbanListProps) {

  const state = useStateContext();
  const dispatch = useStateDispatchContext();

  const listIndex = state.lists.findIndex((list) => list.id === listId);
  if (listIndex === -1)
    throw new Error();

  const addItem = () => {
    const newItemId = uuidv4();

    const newItem: IKanbanItem = {
      id: newItemId,
      content: '',
    };

    dispatch({ type: STATE_ACTION_TYPE.PUSH_ITEM, payload: { newItem: newItem, listIndex: listIndex } });

  };


  return (
    <Droppable droppableId={listId}>
      {(provided) => (
        <Card variant="outlined" sx={{ bgcolor: 'grey.200', width: 400 }} ref={provided.innerRef} {...provided.droppableProps}>
          <CardContent>
            <h1>{state.lists[listIndex].title}</h1>
            <Stack spacing={2}>
              {state.lists[listIndex].items.map((item) => (
                <KanbanItem key={item.id} listId={listId} itemId={item.id}/>
              ))}
              {provided.placeholder}
              <Button startIcon={<AddIcon />} onClick={addItem}>Add item </Button>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Droppable>
  );
}

