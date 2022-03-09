import React, { useState, useEffect } from 'react'
import { Box, Grid, Typography } from '@mui/material';
import ChatContent from './ChatContent';
import ChatList from './ChatList';

function ChatPage({ user }) {
    const [currentConversation, setCurrentConversation] = useState(null)
    const [conversations, setConversations] = useState([])
    const [convoUpdate, setConvoUpdate] = useState(false)

    useEffect(() => {
        let isActive = true
        fetch('/conversations')
        .then(r => r.json())
        .then(res => {
            if (isActive) {
                setConversations(res)
            }
        })
        return () => { isActive = false }
    }, [convoUpdate])

  return (
    <Box sx={{width: "95%", margin: "25px auto"}}>
        <Grid container spacing={2}>
            <Grid item xs={3.5}>
                <ChatList setCurrentConversation={setCurrentConversation} conversations={conversations} setConvoUpdate={setConvoUpdate}/>
            </Grid>
            <Grid item xs={8.5}>
                {user && currentConversation? <ChatContent user={user} currentConversation={currentConversation} setConvoUpdate={setConvoUpdate}/> : (
                <Box sx={{textAlign: "center"}}>
                    <Box sx={{mt: "30px"}}>
                        <Typography component="h2" variant="h4">No active chats currently selected</Typography>
                    </Box>
                </Box>
                )}
            </Grid>
        </Grid>
    </Box>
  );
}

export default ChatPage;
