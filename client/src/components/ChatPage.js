import React, { useState, useEffect } from 'react'
import { Box, Grid } from '@mui/material';
import ChatContent from './ChatContent';
import ChatList from './ChatList';

function ChatPage({ user }) {
    const [currentConversation, setCurrentConversation] = useState({})
    // console.log(currentConversation)

  return (
    <Box sx={{width: "95%", margin: "25px auto"}}>
        <Grid container spacing={4}>
            <Grid item xs={4}>
                <ChatList setCurrentConversation={setCurrentConversation}/>
            </Grid>
            <Grid item xs={8}>
                {user ? <ChatContent user={user} currentConversation={currentConversation}/> : null}
            </Grid>
        </Grid>
    </Box>
  );
}

export default ChatPage;
