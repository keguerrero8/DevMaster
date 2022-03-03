import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Features from "./Features"

function HomePage({user}) {

  return (
    <>
        <div style={{width: "100%", height: "400px", position: "relative"}}>
            <Card 
                sx={{ width: "25%", 
                      backgroundColor: "black", 
                      position: "absolute", 
                      padding: "10px",
                      left: "20%",
                      top: "20%"
                    }}
            >
                <CardContent>
                    <Typography variant="h5" component="h1" color="white" gutterBottom>
                    {user ? `Welcome back, ${user.username}` : "Welcome To DevMaster"}
                    </Typography>
                    <Typography variant="h7" component="div" color="secondary" sx={{mt: "15px"}}>
                    Plan and Manage your next project the right way
                    </Typography>
                </CardContent>
            </Card>
            <img style={{width: "100%", height: "100%"}} src={"https://static.vecteezy.com/system/resources/thumbnails/005/241/954/small/abstract-gradient-gray-and-white-geometric-pattern-element-of-template-overlapping-design-for-tech-artwork-cover-page-background-illustration-vector.jpg"}/>
        </div>
        <Box sx={{textAlign: "center", mt: "20px"}}>
            <Typography component="h2" variant="h5" sx={{fontWeight: "bold"}}>{user ? "Use DevMaster" : "Why use DevMaster?"}</Typography>
        </Box>
        <Features />
    </>
  );
}

export default HomePage;
