import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import AccountTree from '@mui/icons-material/AccountTree';
import FolderIcon from '@mui/icons-material/Folder';

function Features() {

  return (
    <>
    <Box sx={{width: "80%", margin: "35px auto"}}>
        <Grid container spacing={6}>
            <Grid item xs={4}>
                <Card sx={{ backgroundColor: "white", height: "150px", border: "solid black", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", '&:hover': {transform: "scale(1.1)"}}}>
                    <CardContent sx={{margin: "auto"}}>
                        <AccountTree color="secondary" sx={{ fontSize: 70 }}/>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={8}>
                <Card sx={{height: "150px", borderRadius: "10px", border: "solid", backgroundColor: "black", '&:hover': {transform: "scale(1.1)"}, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CardContent >
                        <Typography component="div" variant="h6" color="secondary">Create Diagrams to convey your ideas and designs</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card sx={{ backgroundColor: "white", height: "150px", border: "solid black", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", '&:hover': {transform: "scale(1.1)"}}}>
                    <CardContent sx={{margin: "auto"}}>
                        <FolderIcon color="secondary" sx={{ fontSize: 70 }}/>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={8}>
                <Card sx={{height: "150px", borderRadius: "10px", border: "solid", backgroundColor: "black", '&:hover': {transform: "scale(1.1)"}, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CardContent >
                        <Typography component="div" variant="h6" color="secondary">Manage, monitor, and organize your projects</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card sx={{ backgroundColor: "white", height: "150px", border: "solid black", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", '&:hover': {transform: "scale(1.1)"}}}>
                    <CardContent sx={{margin: "auto"}}>
                        <GroupsIcon color="secondary" sx={{ fontSize: 70 }}/>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={8}>
                <Card sx={{height: "150px", borderRadius: "10px", border: "solid", backgroundColor: "black", '&:hover': {transform: "scale(1.1)"}, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CardContent >
                        <Typography component="div" variant="h6" color="secondary">Share and Collaborate on your project items</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </Box>   
    </>
  );
}

export default Features;
