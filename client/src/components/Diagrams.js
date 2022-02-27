import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import DiagramCard from './DiagramCard';
import Timeline from '@mui/lab/Timeline';
import Modal from '@mui/material/Modal';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function Diagrams() {
    const [showUpdate, setShowUpdate] = useState(false)
    const [diagrams, setDiagrams] = useState([])
    const [formData, setFormData] = useState({ name: "" })
    const [isDiagramChange, setDiagramChange] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setShowUpdate(false)
    };

    useEffect(() => {
        fetch('/diagrams')
        .then(r => r.json())
        .then(res => {
            setDiagrams(res)
        })
    }, [isDiagramChange])

    // console.log(diagrams)

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
            setDiagrams([newDiagram,...diagrams])
            setShowUpdate(true)
        })
    }
    function onChange(event){
        const key= event.target.name;
        const value = event.target.value;
        setFormData({...formData, [key]:value})
    }

  return (
    <Box sx={{margin: "auto", textAlign: "center", width: "80%"}}>
        <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, mr: 5 }}
            onClick={handleOpen}
            color="secondary"
        >
            Create A New Diagram
            <AddCircleIcon sx={{ml: 1}}></AddCircleIcon>
        </Button>
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
                </Box>
        </Modal>
        <Divider textAlign="left">My Diagrams</Divider>
        <Box sx={{margin: "auto", width: "80%"}}>
            <Timeline position="alternate">
                {diagrams.map((diagram) => <DiagramCard  diagram={diagram} key={diagram.id} isDiagramChange={isDiagramChange} setDiagramChange={setDiagramChange}/>)}
            </Timeline>
        </Box>
    </Box>

  )
}

export default Diagrams;