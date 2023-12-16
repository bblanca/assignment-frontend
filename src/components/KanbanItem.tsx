import {Box, Button, Card, CardContent, Checkbox, Stack, Typography} from "@mui/material";

import { Draggable } from 'react-beautiful-dnd';
interface KanbanItemProps {
    key: string,
    entry: {
        id: string,
        content: string,
    },
    index: number
}

function KanbanItem({entry: { id, content}, index}: KanbanItemProps) {
    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
            <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                <CardContent>
                    <Stack spacing={2} direction="row" alignItems="center">
                        <Checkbox/>
                        <Typography variant="h6">{id}</Typography>
                    </Stack>
                </CardContent>
            </Card>)

            }
            
        </Draggable>
    );
}

export default KanbanItem;