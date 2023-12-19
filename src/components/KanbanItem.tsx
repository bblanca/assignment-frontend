import { Draggable } from 'react-beautiful-dnd'
import { Card, CardContent, Checkbox, Stack, TextField, Typography } from '@mui/material'
import { useStateDispatchContext } from '../contexts/KanbanContexts'
import { IKanbanItem } from '../data/KanbanDefinitions'
import React from 'react'

interface KanbanItemProps {
  item: IKanbanItem
  itemIndex: number
}

export function KanbanItem({ item, itemIndex }: KanbanItemProps) {
  const dispatch = useStateDispatchContext()

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value !== '')
      dispatch({
        type: 'updateItemText',
        payload: {
          itemId: item.id,
          itemText: e.target.value,
        },
      })
  }

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.target as HTMLInputElement).value !== '' && e.keyCode === 13 )
      dispatch({
        type: 'updateItemText',
        payload: {
          itemId: item.id,
          itemText: (e.target as HTMLInputElement).value,
        },
      })
  }

  return (
    <Draggable draggableId={item.id} index={itemIndex}>
      {provided => (
        <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <CardContent>
            <Stack spacing={2} direction="row" alignItems="center">
              <Checkbox />
              {item.content === '' ? (
                <TextField
                  label="New Item"
                  variant="standard"
                  autoFocus={true}
                  onKeyDown={handleOnKeyDown}
                  onBlur={handleOnBlur}
                />
              ) : (
                <Typography variant="h6">{item.content}</Typography>
              )}
            </Stack>
          </CardContent>
        </Card>
      )}
    </Draggable>
  )
}
