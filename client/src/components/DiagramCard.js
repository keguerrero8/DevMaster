import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import AccountTree from '@mui/icons-material/AccountTree';

function DiagramCard({ diagram , isDiagramChange, setDiagramChange}) {

    function handleDelete () {
        fetch(`/diagrams/${diagram.id}`, {
            method: 'DELETE'
        }).then(res => setDiagramChange(!isDiagramChange))
    }

  return (
    <Grid item xs={4} >
        <Card sx={{ backgroundColor: "black" }} >
            <CardContent sx={{textAlign: "center"}}>
                <AccountTree color="secondary" sx={{ fontSize: 100 }}/>
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