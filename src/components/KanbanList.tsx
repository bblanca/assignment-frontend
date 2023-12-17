import {Box, Button, Card, CardContent, Checkbox, Stack, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { ReactNode, useState, useReducer } from "react";
import { Droppable } from 'react-beautiful-dnd';
import  KanbanItem  from  "./KanbanItem";
import initialData from "../initial-data";


interface KanbanListProps {
    key: string, 
    list: {
        id: string,
        title: string,
        itemIds: string[],
    },
    items: ({
        id: string;
        content: string;
    })[],
    itemIdCounter: number,
    addItem: (e: any) => void,
    handleItemNaming: (id: string, text: string) => void,
}




export function KanbanList(props: KanbanListProps) {

    return (
        <Droppable droppableId={props.list.id}>
            {(provided)=>(
                <Card variant="outlined" sx={{bgcolor: 'grey.200', width: 400}}  ref={provided.innerRef} {...provided.droppableProps}>
                    <CardContent>
                    <h1>{props.list.title}</h1>
                        <Stack spacing={2} >
                            {props.items.map((item, index) => (
                                <KanbanItem key={item.id} item={item} index={index} handleItemNaming={props.handleItemNaming} />
                            ))}
                            {provided.placeholder}
                            <Button startIcon={<AddIcon />} onClick={props.addItem} value={props.list.id}>Add item</Button>
                        </Stack>
                    </CardContent>
                </Card>
            )}
        </Droppable>
        
    );
}

export default KanbanList;