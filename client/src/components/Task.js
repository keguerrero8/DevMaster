import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import '../App.css';

function Task({task, index, setTaskUpdate}) {

    function handleDelete () {
        fetch(`/tasks/${task.id}`, {
            method: 'DELETE'
        }).then(res => setTaskUpdate((isTaskUpdate) => !isTaskUpdate))
    }
  
    return (
        <Draggable draggableId={task.id} index={index} key={task.id}>
        {(provided) => (
            <div 
                {...provided.draggableProps} 
                {...provided.dragHandleProps} 
                ref={provided.innerRef}
                className="tasks"
            >
                <div style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                    {task.content}
                    <Button size="small" onClick={handleDelete}><DeleteIcon fontSize="small"/></Button>
                </div>
            </div>
        )} 
        </Draggable>
    );
  }
  
  export default Task;