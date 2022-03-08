import * as React from 'react';
import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import { CssBaseline, Box, Typography, Container, Link, Divider } from '@mui/material';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import logo from "../DevMasterLogo.png"

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      Kevin Guerero {new Date().getFullYear()} {'.'}
    </Typography>
  );
}


function Login( { setUser, theme } ) {
    const [showLogin, setShowLogin] = useState(true);

    function handleClick () {
        setShowLogin(!showLogin)
    }
    
    return (
            <Container component="main" maxWidth="xs" sx={{textAlign: "center"}}>
            <CssBaseline />
                <Box
                    sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                <Avatar src={logo} sx={{ width: 96, height: 96 }}/>
                <Typography component="h1" variant="h4" sx={{my: "20px"}}>
                {showLogin ? "Sign In" : "Sign up"}
                </Typography>
                {showLogin ? <LoginForm setUser={setUser} theme={theme}/> : <SignupForm setUser={setUser}/>}
            </Box>
            <Divider/>
            <Typography component="h2" variant="subtitle2" sx={{ mt: 4}}>
            
            {/* {showLogin ? "Don't have an account?": "Already have an account?"}  */}
            {showLogin ?  <> Don't have an account? <Link onClick={handleClick} sx={{cursor: "pointer"}} color="secondary">Sign up</Link> </> : 
            <> Already have an account? <Link onClick={handleClick} sx={{cursor: "pointer"}} color="secondary">Log in</Link> </>} 
            </Typography>
            <Copyright sx={{ my: "20px" }}/>
            </Container>
    );
}

export default Login;