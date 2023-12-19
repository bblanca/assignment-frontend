import { Droppable } from 'react-beautiful-dnd';
import { Button, Card, CardContent, Stack, } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useStateDispatchContext } from '../contexts/KanbanContexts';
import { StateActionType } from '../actions/KanbanActions';
import { IKanbanList } from '../data/KanbanDefinitions';
import { KanbanItem } from './KanbanItem';

interface KanbanListProps {
  list: IKanbanList
}

export function KanbanList({ list }: KanbanListProps) {

  const dispatch = useStateDispatchContext();

  const addItem = () => {
    dispatch({ type: StateActionType.addItemToList, payload: { listId: list.id } });
  };

  return (
    <Droppable droppableId={list.id}>
      {(provided) => (
        <Card variant="outlined" sx={{ bgcolor: 'grey.200', width: 400 }} ref={provided.innerRef} {...provided.droppableProps}>
          <CardContent>
            <h1>{list.title}</h1>
            <Stack spacing={2}>
              {list.items.map((item, index) => (
                <KanbanItem key={item.id} item={item} itemIndex={index}/>
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

