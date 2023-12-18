import { Card, CardContent, Checkbox, Stack, TextField, Typography } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import { IKanbanItem } from '../initial-data';
import { STATE_ACTION_TYPE, stateAction } from '../reducers/kanban.reducer';
import { useStateContext, useStateDispatchContext } from '../contexts/kanban.context';
interface KanbanItemProps {
  listId: string; 
  itemId: string;
}

export function KanbanItem({listId, itemId}: KanbanItemProps) {

  const state = useStateContext();
  const dispatch = useStateDispatchContext();

  const listIndex = state.lists.findIndex((list) => list.id === listId) ;
  const item = state.lists[listIndex].items.find((item) => item.id === itemId);
  const itemIndex = state.lists[listIndex].items.findIndex((item) => item.id === itemId);
  if (item === undefined || listIndex === -1 || itemIndex === -1)
    throw new Error();

  const handleOnBlur = (e: any) => {

    const newItem: IKanbanItem = {
      id: itemId,
      content: e?.target.value
    }
    dispatch({ type: STATE_ACTION_TYPE.SET_ITEM, payload: { newItem: newItem, listIndex: listIndex, itemIndex: itemIndex } });
  };

  const handleKeyPress = (e: any) => {
    if (e.keyCode == 13) {
      const newItem: IKanbanItem = { 
        id: itemId,
        content: e?.target.value
      }
      dispatch({ type: STATE_ACTION_TYPE.SET_ITEM, payload: { newItem: newItem, listIndex: listIndex, itemIndex: itemIndex } });
    }
  };  

  return (
    <Draggable draggableId={item.id} index={itemIndex}>
      {(provided) => (
        <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <CardContent>
            <Stack spacing={2} direction="row" alignItems="center">
              <Checkbox />
              {item.content === '' ? (
                <TextField id="standard-basic" label="New Item" variant="standard" autoFocus={true} onKeyDown={handleKeyPress} onBlur={handleOnBlur} />) : (
                <Typography variant="h6">{item.content}</Typography>
              )}
            </Stack>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
}


