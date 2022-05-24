import React, { useState, useEffect } from 'react';
import {Button, Accordion, AccordionDetails, AccordionSummary, Typography, TextField, Box} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/Folder';
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import GithubSearch from "./GithubSearch";
import ProjectShare from './ProjectShare';

    const columns = [
        {id: "NotStarted", title: "Not Started", color: "#F93308"},
        {id: "InProgress", title: "In Progress", color: "#fad661"},
        {id: "Completed", title: "Completed", color: "#08c414"},
    ]


  function ProjectFolder({project, setProjectUpdate, user}) {
    const {id, title} = project
    const [formData, setFormData] = useState({ content: "", status: "Not Started", project_id: id })
    const [expanded, setExpanded] = useState(false);
    const [tasks, setTasks] = useState([])
    const [isTaskUpdate, setTaskUpdate] = useState(false)
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        let isActive = true
        fetch(`/projects/${id}`)
        .then(r => r.json())
        .then(projectTasks => {
            if (isActive) {
                const projectTasksFormatted = projectTasks.map((p) => {
                    return {
                        id: p.id.toString(),
                        content: p.content,
                        status: p.status
                    }
                })
                setTasks(projectTasksFormatted)
            }
        })
        return () => { isActive = false }
    }, [isTaskUpdate, id])

    function handleAddTask () {
        fetch('/tasks', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(r => {
            setProjectUpdate((isProjectUpdate) => !isProjectUpdate)
            setTaskUpdate((isTaskUpdate) => !isTaskUpdate)
        })
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
        .then(r => {
            setTaskUpdate((isTaskUpdate) => !isTaskUpdate)
            setProjectUpdate((isProjectUpdate) => !isProjectUpdate)
        })
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
            sx={{backgroundColor: "black", overflow: "scroll"}}
            >
                <Box sx={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%"}}>
                    <FolderIcon 
                    sx={{
                        fontSize: {
                            xs: "1rem",
                            md: "1.5rem"
                        },
                        color: "white",
                        display: {
                            xs: "none",
                            sm: "block"
                        }
                    }}/>
                    <Typography 
                    component="h1" 
                    variant="h6" 
                    sx={{ 
                        minWidth: '33%', 
                        flexShrink: 0, 
                        color: "white", 
                        fontWeight: "bold", 
                        fontSize: {
                            xs: "0.9rem",
                            sm: "1rem",
                            md: "1.5rem"
                        },
                        mx: {
                            xs: "10px",
                            md: "15px"
                        }
                    }}>
                        {title}
                    </Typography>
                    <Button 
                        variant="outlined" 
                        size="small" 
                        color="secondary" 
                        onClick={handleDelete} 
                        sx={{
                            zIndex: "30",
                            fontSize: {
                                xs: "0.7rem",
                                sm: "1rem",
                            },
                        }}
                    >
                        Delete
                    </Button>
                </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ overflow: "scroll"}}>
                <Box sx={{width: "1200px", margin: "auto", position: "relative"}}>
                    <ProjectShare project={project} user={user} setProjectUpdate={setProjectUpdate}/>
                    <Box sx={{my: "25px", display: "flex", justifyContent: "center"}}>
                        <div>
                            <TextField 
                                    placeholder="New Task" 
                                    variant="standard" 
                                    color="secondary" 
                                    onChange={onChangeAddTask} 
                                    value={formData.content}
                                    name="content"
                            />
                            <Button sx={{ml: "20px"}} variant="contained" onClick={handleAddTask}>Create Task</Button>
                        </div>
                        <div style={{marginLeft: "80px"}}>
                            {user ? user.github_username !== null ? <GithubSearch user={user} project={project} setProjectUpdate={setProjectUpdate}/> : null : null}
                        </div>
                    </Box>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div style={{display: "flex", justifyContent: "center"}}>
                            {columns.map(column => {
                                const filteredTasks = tasks.filter(task => task.status === column.title)
                                return <Column key={column.id} column={column} tasks={filteredTasks} setTaskUpdate={setTaskUpdate} setProjectUpdate={setProjectUpdate}>{column.title}</Column>
                            })}
                        </div>
                    </DragDropContext>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
  }
  
  export default ProjectFolder;