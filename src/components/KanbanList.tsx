import { Droppable } from 'react-beautiful-dnd'
import { Button, Card, CardContent, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useStateDispatchContext } from '../contexts/KanbanContexts'
import { KanbanList } from '../data/KanbanDefinitions'
import { KanbanItem } from './KanbanItem'
import { v4 as uuidv4 } from 'uuid'

interface KanbanListProps {
  list: KanbanList
}

export function KanbanList({ list }: KanbanListProps) {
  const dispatch = useStateDispatchContext()

  const addEmptyItem = () => {
    dispatch({
      type: 'addEmptyItemToList',
      payload: {
        listId: list.id,
        itemId: uuidv4(),
      },
    })
  }

  return (
    <Droppable droppableId={list.id}>
      {provided => (
        <Card
          variant="outlined"
          sx={{ bgcolor: 'grey.200', width: 400 }}
          ref={provided.innerRef}
          {...provided.droppableProps}>
          <CardContent>
            <h1>{list.title}</h1>
            <Stack spacing={2}>
              {list.items.map((item, index) => (
                <KanbanItem key={item.id} item={item} itemIndex={index} />
              ))}
              {provided.placeholder}
              <Button startIcon={<AddIcon />} onClick={addEmptyItem}>
                Add item{' '}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Droppable>
  )
}
