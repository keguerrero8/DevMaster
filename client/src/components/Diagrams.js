import React, { useState, useEffect } from 'react'
import DiagramCard from './DiagramCard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Typography, Modal, Divider, TextField, Button, Box, Grid } from '@mui/material';

function Diagrams({ user, theme }) {
    const [showUpdate, setShowUpdate] = useState(false)
    const [diagrams, setDiagrams] = useState({solo: [], share: []})
    const [formData, setFormData] = useState({ name: "" })
    const [isDiagramChange, setDiagramChange] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setShowUpdate(false)
    };

    useEffect(() => {
        let isActive = true
        fetch('/diagrams')
        .then(r => r.json())
        .then(res => {
            if (isActive) {
                setDiagrams(res)
            }
        })
        return () => { isActive = false }
    }, [isDiagramChange])

    // console.log(diagrams)

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

    function handleSubmit(event){
        event.preventDefault()
        fetch('/diagrams', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(newDiagram => {
            setDiagramChange((isDiagramChange) => !isDiagramChange)
            setShowUpdate(true)
        })
    }
    function onChange(event){
        const key= event.target.name;
        const value = event.target.value;
        setFormData({...formData, [key]:value})
    }

  return (
    <Box sx={{margin: "auto", width: "85%"}}>
        <Box sx={{margin: "auto", textAlign: "center"}}>
            <Button
                type="submit"
                variant="contained"
                sx={{ 
                    my: 3,
                    fontSize: {
                        xs: "0.8rem",
                        sm: "0.9rem",
                        lg: "1rem"
                    }
                }}
                onClick={handleOpen}
                color="secondary"
            >
                Create New Diagram
                <AddCircleIcon sx={{
                    ml: "5px",
                    fontSize: {
                        xs: "1rem",
                        lg: "1.2rem"
                    }
                }}>

                </AddCircleIcon>
            </Button>
        </Box>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
                <Box component="form" noValidate onSubmit={handleSubmit} sx={style}>
                    <TextField
                        margin="normal"
                        required
                        label="Diagram Name"
                        name="name"
                        variant="outlined"
                        size="small"
                        onChange={onChange}
                        value={formData.name}
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
        <Divider sx={{my: "30px"}}/>
        <Typography component="h1" variant="h4">My Diagrams</Typography>
        <Box sx={{margin: "30px auto"}}>
            {diagrams.solo.length > 0 ? (
                <Grid container spacing={{xs: 4, md: 8, lg: 4}}>
                    {diagrams.solo.map((diagram) => <DiagramCard
                        user={user}  
                        diagram={diagram} 
                        key={diagram.id} 
                        isDiagramChange={isDiagramChange} 
                        setDiagramChange={setDiagramChange}
                        />)}
                </Grid>
            ) : (
                <Typography component="h1" variant="h6">You have no Personal Diagrams</Typography>
            )}
        </Box>
        <Divider sx={{my: "30px"}}/>
        <Typography component="h1" variant="h4"
            sx={{fontSize: "2rem"}}
        >
            Shared Diagrams
        </Typography>
        <Box sx={{margin: "30px auto"}}>
            {diagrams.share.length > 0 ? (
                <Grid container spacing={{xs: 4, md: 8, lg: 4}}>
                    {diagrams.share.map((diagram) => <DiagramCard
                        user={user}  
                        diagram={diagram} 
                        key={diagram.id} 
                        isDiagramChange={isDiagramChange} 
                        setDiagramChange={setDiagramChange}
                        />)}
                </Grid>
            ) : (
                <Typography component="h1" variant="h6">You have no Shared Diagrams</Typography>
            )}
        </Box>
    </Box>

  )
}

export default Diagrams;