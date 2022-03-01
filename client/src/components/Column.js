import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task"

function Column({column, tasks, setTaskUpdate}) {
  
    return (
        <div style={{margin: "8px", border: "1px solid", borderRadius: "10px", width: "30%", minHeight: "200px", textAlign: "center"}}>
            <div style={{backgroundColor: column.color, width: "90%", margin: "5px auto", padding: "8px", fontWeight: "bold", fontSize: "25px", border: "solid", borderRadius: "5px"}}>
                {/* <h1 style={{padding: "8px"}}>{column.title}</h1> */}
                {column.title}
            </div>
            <Droppable droppableId={column.title}>
                {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} style={snapshot.isDraggingOver ? {backgroundColor: "skyblue", padding: "8px"} : null}>
                        {tasks.map((task, index) => <Task task={task} index={index} key={task.id} setTaskUpdate={setTaskUpdate}/>)}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
  }
  
  export default Column;