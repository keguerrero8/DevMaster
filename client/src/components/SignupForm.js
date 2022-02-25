import * as React from 'react';
import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useHistory } from "react-router-dom";

function SignupForm({ setUser }) {
    const history = useHistory();
    const [errors, setErrors] = useState(null)
    const [credentials, setCredentials] = useState({
        username : "",
        password : "",
        password_confirmation : "",
        avatar : "",
        github_username : ""
    })
    
    function handleSubmit (e) {
        e.preventDefault();
        fetch("/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((userData) => {
                    setUser(userData)
                    history.push("/")
                })
            }
            else {
                r.json().then((err) => setErrors(err.error))
            }
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
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <TextField
                margin="normal"
                required
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
                required
                fullWidth
                name="password"
                label="Password"
                variant="standard"
                color="secondary"
                size="small"
                type="password"
                onChange={handleChange}
                value={credentials.password}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password_confirmation"
                label="Password Confirmation"
                variant="standard"
                color="secondary"
                size="small"
                type="password"
                onChange={handleChange}
                value={credentials.password_confirmation}
            />
            <TextField
                margin="normal"
                fullWidth
                name="avatar"
                label="Avatar url"
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
            <Button
                type="submit"
                variant="contained"
                size="small"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
            >
                Sign Up
            </Button>
            </Box>
            {errors ? errors.map((e) => <Typography key={e} variant="subtitle1" component="h2" gutterBottom sx={{color: "red"}}>{e} </Typography>) : null}
        </>
      );
}

export default SignupForm;