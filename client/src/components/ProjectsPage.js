import React, { useState, useEffect } from 'react';
import ProjectFolder from './ProjectFolder';
import { Divider, Typography, Modal, Button, TextField, Box } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BarGraph from './BarGraph'

  function ProjectsPage({user}) {
    const [showUpdate, setShowUpdate] = useState(false)
    const [formData, setFormData] = useState({ title: "" })
    const [projects, setProjects] = useState({solo: [], share: []})
    const [isProjectUpdate, setProjectUpdate] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setShowUpdate(false)
    };

    useEffect(() => {
        let isActive = true
        fetch('/projects')
        .then(r => r.json())
        .then(res => {
            if (isActive) {
                setProjects(res)
            }
        })
        return () => { isActive = false }
    }, [isProjectUpdate])

    function handleCreateProject (event) {
        event.preventDefault()
        fetch('/projects', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(r => {
            setShowUpdate(true)
            setProjectUpdate((isProjectUpdate) => !isProjectUpdate)
        })
    }

    function onChange(event){
        const key= event.target.name;
        const value = event.target.value;
        setFormData({...formData, [key]:value})
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {
            xs: "70%",
            md: "40%",
            lg: "30%"
        },
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        textAlign: "center"
      };
  
    return (
        <Box sx={{width: "100%"}}>
            <Box 
                sx={{
                    width: "100%",
                    display: {
                        xs: "none",
                        sm: "block"
                    }
                }}
            >
                <Box sx={{width: "90%", margin: "auto", textAlign: "center"}}>
                    <h2 style={{marginBottom: "40px"}}>Project Activity Summary</h2>
                </Box>
                <BarGraph projects={projects}/>
                <Divider sx={{width: "90%", margin: "30px auto"}}/>
            </Box>
            <Box sx={{textAlign: "center"}}>                
                <Button
                type="submit"
                variant="contained"
                sx={{
                    my: 3,
                    fontSize: {
                        xs: "0.8rem",
                        sm: "0.9rem",
                        md: "1rem"
                    }
                }}
                onClick={handleOpen}
                color="secondary"
                >
                    Create Project Folder
                    <AddCircleIcon 
                        sx={{
                            ml: "5px",
                            fontSize: {
                                xs: "1rem",
                                lg: "1.2rem"
                            }
                            }}>
                    </AddCircleIcon>
                </Button>
            </Box>
            <Box sx={{width: "90%", margin: "auto", display: "flex"}}>
                <Typography component="h1" variant="h4" sx={{mr: "auto", mb: 3}}>My Projects</Typography>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                    <Box component="form" noValidate onSubmit={handleCreateProject} sx={style}>
                        <TextField
                            margin="normal"
                            required
                            label="Project Name"
                            name="title"
                            variant="outlined"
                            size="small"
                            onChange={onChange}
                            value={formData.title}
                            fullWidth
                            color="secondary"
                        />
                        {showUpdate ? <h4>Successfully created!</h4> : null}
                        <Box>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                fullWidth
                                color="secondary"
                            >
                                Create 
                            </Button>
                        </Box>
                        <Button onClick={handleClose} sx={{position: "absolute", right: "0px"}}>CLOSE</Button>
                    </Box>
            </Modal>
            <Box sx={{width: "90%", margin: "20px auto"}}>
                {projects.solo.length > 0 ? (
                    <>
                        {projects.solo.map((project) => <ProjectFolder 
                        user={user} key={project.id} 
                        project={project} 
                        setProjectUpdate={setProjectUpdate}
                        />)}
                    </>
                ) : <Typography component="h1" variant="h6">You have no Personal Projects</Typography>}
            </Box>
            <Divider sx={{width: "90%", margin: "30px auto"}}/>
            <Box sx={{width: "90%", margin: "auto", display: "flex"}}>
                <Typography component="h1" variant="h4" sx={{mr: "auto", mb: 3}}>Shared Projects</Typography>
            </Box>
            <Box sx={{width: "90%", margin: "20px auto"}}>
                {projects.share.length > 0 ? (
                    <>
                        {projects.share.map((project) => <ProjectFolder 
                        user={user} key={project.id} 
                        project={project} 
                        setProjectUpdate={setProjectUpdate}
                        />)}
                    </>
                ) : <Typography component="h1" variant="h6">You have no Shared Projects</Typography>}
            </Box>
        </Box>
    );
  }
  
  export default ProjectsPage;