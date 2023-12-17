import {Box, Button, Card, CardContent, Checkbox, Stack, Typography} from "@mui/material";
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { BaseSyntheticEvent, SyntheticEvent, useState } from "react";
import KanbanList from "./KanbanList";
import initialData from "../initial-data";
import { constants } from "crypto";
import { SyntheticEventData } from "react-dom/test-utils";
import { Satellite } from "@mui/icons-material";



export function Kanban() {
    const [state, setState] = useState(initialData);   //Fixme?? one useState for all data? useReducer? 
  
    
    
    
    const onDragEnd = (result: DropResult) => {
        const {destination, source, draggableId} = result;

        if(!destination ||
           destination.droppableId === source.droppableId &&
           destination.index === source.index){
            return;
        }

        if(destination.droppableId === source.droppableId ){
            const newList = state.lists[source.droppableId as keyof typeof state.lists];
            const newItemIds = Array.from(newList.itemIds);
            newItemIds.splice(source.index, 1);
            newItemIds.splice(destination.index, 0, draggableId);
    
            
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
            const newSourceItemIds = Array.from(sourceList.itemIds);
            newSourceItemIds.splice(source.index, 1);
    
            const newSourceList = {
            ...sourceList,
            itemIds: newSourceItemIds,
            };
    
            const destinationList = state.lists[destination.droppableId as keyof typeof state.lists];
            const newDestinationItemIds = Array.from(destinationList.itemIds);
            newDestinationItemIds.splice(destination.index, 0, draggableId);
    
            const newDestinationList = {
            ...destinationList,
            itemIds: newDestinationItemIds,
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

    const handleItemNaming = (id: string, text: string) => {
        const newItems = {
            ...state.items,
            [id]: {
                id: id,
                content: text
            }
        };

        const newState = {
            ...state,
            items: newItems,
        }
        setState(newState);
    }

    const addItem = (e: BaseSyntheticEvent) => {
         //create item and add to list

        //props.list.itemIds.push('task-' + (props.itemIdCounter++).toString()); //fixme: why not like this? update State? 
        const listId = e.target.value as keyof typeof state.lists;
        const newItemIdCounter = state.itemIdCounter + 1; //fixme: necessary since it countains value and not a refernece
        const newItemId = 'task-' + newItemIdCounter.toString();

        const newItemIds = Array.from(state.lists[listId].itemIds);
        newItemIds.push(newItemId);

        const newList = {
            ...state.lists[listId],
            itemIds: newItemIds
        }

        const newItem = {
            id: newItemId,
            content: ''
        }

        const newItems = {
            ...state.items,
            [newItemId]: newItem,
        };

        const newState = {
            ...state,
            lists: {
                ...state.lists,
                [newList.id]: newList,
            },
            items: newItems,
            itemIdCounter: newItemIdCounter
        }
    

        setState(newState);
    }

    
    return (
        <DragDropContext onDragEnd={onDragEnd} >
            <Box sx={{paddingBottom: 4}}>
                <Stack spacing={2} margin={5} direction="row" alignItems="flex-start">{
                        state.listOrder.map((listID) => {
                            const list = state.lists[listID  as keyof typeof state.lists];
                            const items = list.itemIds.map(itemId => state.items[itemId as keyof typeof state.items])
                            return (<KanbanList key={list.id} list={list} items={items} itemIdCounter={state.itemIdCounter} addItem={addItem} handleItemNaming={handleItemNaming}/>)
                        }
                        )
                    }
                </Stack>
            </Box>
        </DragDropContext>
    );
}

export default Kanban;