import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

function DiagramCard({ diagram , isDiagramChange, setDiagramChange}) {

    function handleDelete () {
        fetch(`/diagrams/${diagram.id}`, {
            method: 'DELETE'
        }).then(res => setDiagramChange(!isDiagramChange))
    }

  return (
      <>
        <TimelineItem key={diagram.id}>
            <TimelineSeparator>
                <TimelineDot color="secondary" />
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
                <Card sx={{ minWidth: 275, backgroundColor: "black" }} >
                    <CardContent sx={{textAlign: "center"}}>
                        <Typography sx={{ fontSize: 18 }} color="white" gutterBottom>
                        {diagram.name}
                        </Typography>
                        <Link to={`diagrams/${diagram.id}`} style={{textDecoration: "none"}}>
                            <Button size="small" color="secondary" variant="outlined" sx={{mr: "10px"}}>Edit</Button>
                        </Link>
                        <Button size="small" color="secondary" variant="outlined" onClick={handleDelete}>Delete</Button>
                    </CardContent>
                </Card>
            </TimelineContent>
        </TimelineItem>
    </>
  )
}

export default DiagramCard;