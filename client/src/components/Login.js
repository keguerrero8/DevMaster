import * as React from 'react';
import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

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
                <Typography component="h1" variant="h4" sx={{mt: "10px", mb: "10px"}}>
                Sign In
                </Typography>
                {showLogin ? <LoginForm setUser={setUser} theme={theme}/> : <SignupForm setUser={setUser}/>}
            </Box>
            <Divider/>
            <Typography component="h2" variant="subtitle2" sx={{ mt: 4}}>
            
            {/* {showLogin ? "Don't have an account?": "Already have an account?"}  */}
            {showLogin ?  <> Don't have an account? <Link onClick={handleClick} sx={{cursor: "pointer"}} color="secondary">Sign up</Link> </> : 
            <> Already have an account? <Link onClick={handleClick} sx={{cursor: "pointer"}} color="secondary">Log in</Link> </>} 
            </Typography>
            <Copyright sx={{ mt: 3 }}/>
            </Container>
    );
}

export default Login;