import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task"

function Column({column, tasks, setTaskUpdate, setProjectUpdate}) {
  
    return (
        <div style={{margin: "8px", border: "1px solid", borderRadius: "10px", width: "30%", minHeight: "200px", textAlign: "center"}}>
            <div style={{backgroundColor: column.color, width: "85%", margin: "5px auto", padding: "8px", fontWeight: "bold", fontSize: "1.5rem", border: "solid", borderRadius: "5px"}}>
                {column.title}
            </div>
            <Droppable droppableId={column.title}>
                {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} style={snapshot.isDraggingOver ? {backgroundColor: "skyblue", padding: "8px"} : null}>
                        {tasks.map((task, index) => <Task task={task} index={index} key={task.id} setTaskUpdate={setTaskUpdate} setProjectUpdate={setProjectUpdate}/>)}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
  }
  
  export default Column;