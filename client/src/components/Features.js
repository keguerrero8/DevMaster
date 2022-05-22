import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import AccountTree from '@mui/icons-material/AccountTree';
import FolderIcon from '@mui/icons-material/Folder';

function Features({theme}) {

  return (
    <>
    <Box sx={{width: {
                xs: "90%",
                md: "90%",
                lg: "80%"
            }, 
              margin: "35px auto"
            }}>
        <Grid container spacing={{ xs: 2, md: 4, lg: 6 }}>
            <Grid item xs={4}>
                <Card sx={{ backgroundColor: "white", height: "150px", border: "solid black", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", '&:hover': {transform: "scale(1.1)"}}}>
                    <CardContent sx={{margin: "auto"}}>
                        <AccountTree color="secondary" 
                            sx={{ 
                                fontSize: {
                                    xs: "3rem",
                                    sm: "3rem",
                                    md: "4rem",
                                    lg: "4.5rem"
                                } }}
                        />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={8}>
                <Card sx={{height: "150px", borderRadius: "10px", border: "solid", backgroundColor: "black", '&:hover': {transform: "scale(1.1)"}, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CardContent sx={{textAlign: "center"}}>
                        <Typography component="div" variant="h6" color="secondary" 
                            sx={{
                                fontSize: {
                                    xs: "1rem",
                                    sm: "1rem",
                                    md: "1.2rem",
                                }
                            }}
                        >
                            Create Diagrams to convey your ideas and designs
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card sx={{ backgroundColor: "white", height: "150px", border: "solid black", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", '&:hover': {transform: "scale(1.1)"}}}>
                    <CardContent sx={{margin: "auto"}}>
                        <FolderIcon color="secondary" 
                            sx={{ 
                                fontSize: {
                                    xs: "3rem",
                                    sm: "3rem",
                                    md: "4rem",
                                    lg: "4.5rem"
                                } }}
                        />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={8}>
                <Card sx={{height: "150px", borderRadius: "10px", border: "solid", backgroundColor: "black", '&:hover': {transform: "scale(1.1)"}, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CardContent sx={{textAlign: "center"}}>
                    <Typography component="div" variant="h6" color="secondary" 
                            sx={{
                                fontSize: {
                                    xs: "1rem",
                                    sm: "1rem",
                                    md: "1.2rem",
                                }
                            }}
                    >
                        Manage, monitor, and organize your projects
                    </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card sx={{ backgroundColor: "white", height: "150px", border: "solid black", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", '&:hover': {transform: "scale(1.1)"}}}>
                    <CardContent sx={{margin: "auto"}}>
                        <GroupsIcon color="secondary" 
                            sx={{ 
                                fontSize: {
                                    xs: "3rem",
                                    sm: "3rem",
                                    md: "4rem",
                                    lg: "4.5rem"
                                } }}
                        />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={8}>
                <Card sx={{height: "150px", borderRadius: "10px", border: "solid", backgroundColor: "black", '&:hover': {transform: "scale(1.1)"}, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CardContent sx={{textAlign: "center"}}>
                    <Typography component="div" variant="h6" color="secondary" 
                            sx={{
                                fontSize: {
                                    xs: "1rem",
                                    sm: "1rem",
                                    md: "1.2rem",
                                }
                            }}
                    >
                        Share and Collaborate on your project items
                    </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </Box>   
    </>
  );
}

export default Features;
