import React, { useState, useEffect } from 'react';
import {Button, Accordion, AccordionDetails, AccordionSummary, Typography, TextField, Box} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/Folder';
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

    const columns = [
        {id: "NotStarted", title: "Not Started", color: "#fa4d4d"},
        {id: "InProgress", title: "In Progress", color: "#fad661"},
        {id: "Completed", title: "Completed", color: "#08c414"},
    ]


  function ProjectFolder({project, setProjectUpdate}) {
    const {id, title, github_link} = project
    const [formData, setFormData] = useState({ content: "", status: "Not Started", project_id: id })
    const [expanded, setExpanded] = useState(false);
    const [tasks, setTasks] = useState([])
    const [isTaskUpdate, setTaskUpdate] = useState(false)
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        fetch(`/projects/${project.id}`)
        .then(r => r.json())
        .then(projectTasks => {
            const projectTasksFormatted = projectTasks.map((p) => {
                return {
                    id: p.id.toString(),
                    content: p.content,
                    status: p.status
                }
            })
            setTasks(projectTasksFormatted)
        })
    }, [isTaskUpdate])

    // console.log(tasks)

    function handleAddTask () {
        fetch('/tasks', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(r => setTaskUpdate((isTaskUpdate) => !isTaskUpdate))
    }

    function onChangeAddTask(event){
        const key= event.target.name;
        const value = event.target.value;
        setFormData({...formData, [key]:value})
    }

    function onDragEnd (result) {
        const {destination, source, draggableId} = result
        if (!destination) return
        if (destination.droppableId === source.droppableId ) return
        fetch(`/tasks/${draggableId}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({status: destination.droppableId})
        })
        .then(r => r.json())
        .then(r => setTaskUpdate((isTaskUpdate) => !isTaskUpdate))
      }

    function handleDelete (event) {
        fetch(`/projects/${id}`, {
            method: 'DELETE'
        }).then(r => {
            setExpanded(false)
            setProjectUpdate((isProjectUpdate) => !isProjectUpdate)
        })
    }
  
    return (
        <Accordion expanded={expanded === 'panel'} onChange={handleChange('panel')} sx={{border: "solid #14a37f"}}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{color: "white"}}/>}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{backgroundColor: "black"}}
            >
                <Box sx={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%"}}>
                    <FolderIcon sx={{color: "white"}}/>
                    <Typography component="h1" variant="h6" sx={{ minWidth: '33%', flexShrink: 0, color: "white", fontWeight: "bold", mx: "15px"}}>
                        {title}
                    </Typography>
                    <Button variant="outlined" size="small" color="secondary" onClick={handleDelete} sx={{zIndex: "30"}}>Delete</Button>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{my: "25px"}}>
                        <TextField 
                                placeholder="New Task" 
                                variant="standard" 
                                color="secondary" 
                                onChange={onChangeAddTask} 
                                value={formData.content}
                                name="content"
                        />
                        <Button sx={{ml: "20px"}} variant="contained" onClick={handleAddTask}>Create Task</Button>
                        <Button sx={{ml: "20px"}} variant="contained" >Link Github repo</Button>
                        {/* <Typography component="h2" variant="subtitle2" sx={{ ml: "50px"}}>Github Link: {github_link}</Typography> */}
                </Box>
                <DragDropContext onDragEnd={onDragEnd}>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        {columns.map(column => {
                            const filteredTasks = tasks.filter(task => task.status === column.title)
                            return <Column key={column.id} column={column} tasks={filteredTasks} setTaskUpdate={setTaskUpdate} setProjectUpdate={setProjectUpdate}>{column.title}</Column>
                        })}
                    </div>
                </DragDropContext>
            </AccordionDetails>
        </Accordion>
    );
  }
  
  export default ProjectFolder;