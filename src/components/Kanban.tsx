import {Box, Button, Card, CardContent, Checkbox, Stack, Typography} from "@mui/material";
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useState } from "react";
import KanbanList from "./KanbanList";
import initialData from "../initial-data";



export function Kanban() {
    const [state, setState] = useState(initialData);
    //let state = initialData;
    let onDragEnd = (result: DropResult) => {
        const {destination, source, draggableId} = result;

        if(!destination ||
           destination.droppableId === source.droppableId &&
           destination.index === source.index){
            return;
        }

        if(destination.droppableId === source.droppableId ){
            const list = state.lists[source.droppableId as keyof typeof state.lists];
            const newEntryIds = Array.from(list.entryIds);
            newEntryIds.splice(source.index, 1);
            newEntryIds.splice(destination.index, 0, draggableId);
    
            const newList = {
            ...list,
            entryIds: newEntryIds,
            };
    
            const newState = {
            ...state,
            lists: {
                ...state.lists,
                [newList.id]: newList,
            },
            };
    
            setState(newState);  
        }
        else{
            const sourceList = state.lists[source.droppableId as keyof typeof state.lists];
            const newSourceEntryIds = Array.from(sourceList.entryIds);
            newSourceEntryIds.splice(source.index, 1);
    
            const newSourceList = {
            ...sourceList,
            entryIds: newSourceEntryIds,
            };
    
            const destinationList = state.lists[destination.droppableId as keyof typeof state.lists];
            const newDestinationEntryIds = Array.from(destinationList.entryIds);
            newDestinationEntryIds.splice(destination.index, 0, draggableId);
    
            const newDestinationList = {
            ...destinationList,
            entryIds: newDestinationEntryIds,
            };


            const newState = {
            ...state,
            lists: {
                ...state.lists,
                [newSourceList.id]: newSourceList,
                [newDestinationList.id]: newDestinationList,
            },
            };
    
            setState(newState);  
        }
        

    };



    
    return (
        <DragDropContext onDragEnd={onDragEnd} >
            <Box sx={{paddingBottom: 4}}>
                
                <Stack spacing={2} margin={5} direction="row">{
                        state.listOrder.map((listID) => {
                            const list = state.lists[listID  as keyof typeof state.lists];
                            const entries = list.entryIds.map(entryId => state.entries[entryId as keyof typeof state.entries])
                            return (<KanbanList key={list.id} list={list} entries={entries}/>)
                        }
                        )
                    }
                </Stack>
                
            </Box>
        </DragDropContext>
    );
}

export default Kanban;