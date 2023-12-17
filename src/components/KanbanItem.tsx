import {Box, Button, Card, CardContent, Checkbox, Stack, TextField, Typography} from "@mui/material";
import { ChangeEvent } from "react";

import { Draggable } from 'react-beautiful-dnd';
interface KanbanItemProps {
    key: string,
    item: {
        id: string,
        content: string,
    },
    index: number,
    handleItemNaming: (id: string, text: string) => void,
}

function KanbanItem(props: KanbanItemProps) {
    
    const handleOnBlur = (e: any) => {
        let text = e?.target.value;
        props.handleItemNaming(props.item.id, text);
    }

    const handleKeyPress = (e: any) => {
        if(e.keyCode == 13){
            let text = e?.target.value;
            props.handleItemNaming(props.item.id, text);
        }        
     }


    return (
        <Draggable draggableId={props.item.id} index={props.index}>
            {(provided) => (
            <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                <CardContent>
                    <Stack spacing={2} direction="row" alignItems="center">
                        <Checkbox/>
                        { props.item.content ===''? 
                            <TextField id="standard-basic" label="New Item" variant="standard"  autoFocus={true}  onKeyDown={handleKeyPress}  onBlur={handleOnBlur} /> : 
                            <Typography variant="h6">{props.item.content}</Typography>
                        }
                    </Stack>
                </CardContent>
            </Card>)

            }
            
        </Draggable>
    );
}

export default KanbanItem;