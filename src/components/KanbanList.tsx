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
        <Card variant="outlined" sx={{bgcolor: 'grey.200', width: 400}}>
            <CardContent>
                <Droppable droppableId={kanbanListProps.list.id}>
                    {(provided)=>(
                        <Stack spacing={2} ref={provided.innerRef} {...provided.droppableProps}>
                            {kanbanListProps.entries.map((entry, index) => (
                                <KanbanItem key={entry.id} entry={entry} index={index}/>
                            ))}
                            {provided.placeholder}
                        </Stack>
                    )}
                    
                </Droppable>
            </CardContent>
        </Card>
    );
}

export default KanbanList;