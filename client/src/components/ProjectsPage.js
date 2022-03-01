import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


  function ProjectsPage() {
    const [formData, setFormData] = useState({ title: "" })

    function handleSubmit (event) {
        event.preventDefault()
        fetch('/projects', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(newDiagram => {
            console.log(newDiagram)
        })
    }

    function onChange(event){
        const key= event.target.name;
        const value = event.target.value;
        setFormData({...formData, [key]:value})
    }

  
    return (
        <Box sx={{textAlign: "center"}}>
            <h2 style={{marginBottom: "40px"}}>Bar Graph component at the end here</h2>
            <Typography sx={{mb: "30px"}}>Create a new project folder below</Typography>
                <TextField 
                    placeholder="Project Name" 
                    variant="standard" 
                    color="secondary" 
                    onChange={onChange} 
                    value={formData.title}
                    name="title"
                />
                <Button sx={{ml: "20px"}} variant="contained" onClick={handleSubmit}>Create</Button>
        </Box>
    );
  }
  
  export default ProjectsPage;