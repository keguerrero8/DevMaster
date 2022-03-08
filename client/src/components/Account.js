import * as React from 'react';
import { useState } from "react";
import { Button, TextField, Box, Typography, Avatar } from '@mui/material';

function Account({ setUser, user }) {
    const [credentials, setCredentials] = useState({
        username : "",
        avatar : "",
        github_username : ""
    })
    
    function handleSubmit (e) {
        e.preventDefault();
        const userChange = {}
        for (const key in credentials) {
            if (credentials[key] !== "") {
                userChange[key] = credentials[key]
            }
        }
        fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userChange)
        })
        .then((r) => {
            r.json().then((userData) => {
                setUser(userData)
            })
        })
    };

      function handleChange (e) {
          setCredentials({
              ...credentials,
              [e.target.name] : e.target.value
          })
      }
    
      return (
        <>
            <Box sx={{ textAlign: "center", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                <Typography component="h1" variant="h4" sx={{ my: "20px"}}>Account Settings</Typography>
                <Avatar alt="Remy Sharp" src={user.avatar} sx={{ width: 80, height: 80 }}/>
            </Box>
            <Box component="form" noValidate sx={{ mt: 1, width: "90%", margin: "auto" }} onSubmit={handleSubmit}>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Username"
                    name="username"
                    variant="standard"
                    color="secondary"
                    size="small"
                    onChange={handleChange}
                    value={credentials.username}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Avatar url"
                    name="avatar"
                    variant="standard"
                    color="secondary"
                    size="small"
                    onChange={handleChange}
                    value={credentials.avatar}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    name="github_username"
                    label="Github Username"
                    variant="standard"
                    color="secondary"
                    size="small"
                    onChange={handleChange}
                    value={credentials.github_username}
                />
                <Box sx={{textAlign: "center"}}>
                    <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit Changes
                    </Button>
                </Box>
                {/* {errors ? errors.map((e) => <Typography key={e} variant="subtitle1" component="h2" gutterBottom sx={{color: "red"}}>{e} </Typography>) : null} */}
            </Box>
        </>
      );
}

export default Account;