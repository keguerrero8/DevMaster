import React, {useEffect, useState} from 'react'
import { Box, Typography } from '@mui/material';
import ChatInvite from './ChatInvite';


function ChatContent({ user, currentConversation }) {

  return (
    <>
    <Box sx={{border: "solid black", borderRadius: "20px", width: "100%", height: "85vh", position: "relative"}}>
      <ChatInvite user={user} currentConversation={currentConversation}/>
      <Box sx={{width: "80%", margin: "10px auto", textAlign: "center"}}>
        <Typography component="h1" variant="h4">{currentConversation.title}</Typography>
      </Box>
    </Box>
    </>
  );
}

export default ChatContent