import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ProjectFolder from './ProjectFolder';
import Modal from '@mui/material/Modal';
import AddCircleIcon from '@mui/icons-material/AddCircle';

  function ProjectsPage() {
    const [showUpdate, setShowUpdate] = useState(false)
    const [formData, setFormData] = useState({ title: "" })
    const [projects, setProjects] = useState([])
    const [isProjectUpdate, setProjectUpdate] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setShowUpdate(false)
    };

    console.log(projects)

    useEffect(() => {
        fetch('/projects')
        .then(r => r.json())
        .then(res => {
            setProjects(res)
        })
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
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        textAlign: "center"
      };
  
    return (
        <Box sx={{textAlign: "center"}}>
            <h2 style={{marginBottom: "40px"}}>Bar Graph component at the end here</h2>
            <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, mr: 5 }}
            onClick={handleOpen}
            color="secondary"
            >
                Create New Project Folder
                <AddCircleIcon sx={{ml: 1}}></AddCircleIcon>
            </Button>
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
                    </Box>
            </Modal>
            <Box sx={{width: "90%", margin: "20px auto"}}>
                {projects.map((project) => <ProjectFolder key={project.id} project={project} setProjectUpdate={setProjectUpdate}/>)}
            </Box>
        </Box>
    );
  }
  
  export default ProjectsPage;