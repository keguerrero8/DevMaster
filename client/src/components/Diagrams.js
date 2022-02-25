import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import DiagramCard from './DiagramCard';
import Timeline from '@mui/lab/Timeline';

function Diagrams() {
    const [errors, setErrors] = useState(null);
    const [diagrams, setDiagrams] = useState([])
    const [formData, setFormData] = useState({ name: "" })
    const [isDiagramChange, setDiagramChange] = useState(false)

    useEffect(() => {
        fetch('/diagrams')
        .then(r => r.json())
        .then(res => {
            setDiagrams(res)
        })
    }, [isDiagramChange])

    console.log(diagrams)

    function handleSubmit(event){
        event.preventDefault()
        fetch('/diagrams', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(formData)
        }).then(res => {
            if (res.ok) {
                res.json().then(newDiagram => setDiagrams([newDiagram,...diagrams]))
                setErrors(null)
            }
            else {
                res.json().then((err) => setErrors(err.errors))
            }
        })
    }
    function onChange(event){
        const key= event.target.name;
        const value = event.target.value;
        setFormData({...formData, [key]:value})
    }
  return (
    <div>
        {/* <Container maxWidth="xs" sx={{ textAlign: "center"}}> */}
        <Box sx={{margin: "auto", textAlign: "center", width: "80%"}}>
            <h2 className='newSub'>Create A New Diagram</h2>
            <Box component="form" noValidate onSubmit={handleSubmit}>
                <TextField
                    margin="normal"
                    required
                    label="Diagram Name"
                    name="name"
                    variant="outlined"
                    size="small"
                    onChange={onChange}
                    value={formData.name}
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Submit
                </Button>
                <Divider textAlign="left">My Diagrams</Divider>
            </Box>
            <Box sx={{margin: "auto", width: "80%"}}>
            <Timeline position="alternate">
                {diagrams.map((diagram) => <DiagramCard  diagram={diagram} key={diagram.id} isDiagramChange={isDiagramChange} setDiagramChange={setDiagramChange}/>)}
            </Timeline>
            </Box>
        </Box>
        {/* </Container> */}
    </div>

  )
}

export default Diagrams;