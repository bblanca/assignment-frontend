import {Box, Button, Card, CardContent, Checkbox, Stack, Typography} from "@mui/material";
import { ReactNode, useState, useReducer } from "react";
import { Droppable } from 'react-beautiful-dnd';
import  KanbanItem  from  "./KanbanItem";
import initialData from "../initial-data";


interface KanbanListProps {
    key: string, 
    list: {
        id: string,
        title: string,
        entryIds: string[],
    },
    entries: ({
        id: string;
        content: string;
    })[],
}



export function KanbanList(kanbanListProps: KanbanListProps) {

    return (
        <Droppable droppableId={kanbanListProps.list.id}>
            {(provided)=>(
                <Card variant="outlined" sx={{bgcolor: 'grey.200', width: 400}}  ref={provided.innerRef} {...provided.droppableProps}>
                    <CardContent>
                        <Stack spacing={2}>
                            {kanbanListProps.entries.map((entry, index) => (
                                <KanbanItem key={entry.id} entry={entry} index={index}/>
                            ))}
                            {provided.placeholder}
                        </Stack>
                    </CardContent>
                </Card>
            )}
        </Droppable>
    );
}

export default KanbanList;