import React from 'react'
import { Card, CardContent, Button, Typography, Grid } from '@mui/material';
import AccountTree from '@mui/icons-material/AccountTree';
import { Link } from 'react-router-dom'
import DiagramShare from './DiagramShare';
import '../App.css';

function DiagramCard({ diagram , isDiagramChange, setDiagramChange, user }) {

    function handleDelete () {
        fetch(`/diagrams/${diagram.id}`, {
            method: 'DELETE'
        }).then(res => setDiagramChange(!isDiagramChange))
    }

  return (
    <Grid item xs={4} >
        <Card sx={{ backgroundColor: "black", '&:hover': {transform: "scale(1.1)"}, position: "relative" }} >
            <DiagramShare diagram={diagram} user={user} setDiagramChange={setDiagramChange}/>
            <CardContent sx={{textAlign: "center"}}>
                <AccountTree color="secondary" sx={{ fontSize: 80 }}/>
                <Typography sx={{ fontSize: 18 }} color="white" gutterBottom>
                {diagram.name}
                </Typography>
                <Link to={`diagrams/${diagram.id}`} style={{textDecoration: "none"}}>
                    <Button size="small" color="secondary" variant="outlined" sx={{mr: "10px"}}>Edit</Button>
                </Link>
                <Button size="small" color="secondary" variant="outlined" onClick={handleDelete}>Delete</Button>
            </CardContent>
        </Card>     
    </Grid>
  )
}

export default DiagramCard;