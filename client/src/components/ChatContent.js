import React, {useEffect, useState } from 'react'
import { Box, Typography, TextField, Button, Avatar } from '@mui/material';
import ChatInvite from './ChatInvite';
import ChatDelete from './ChatDelete';
import { createConsumer } from "@rails/actioncable"


function ChatContent({ user, currentConversation, setConvoUpdate, setCurrentConversation }) {
  const [formData, setFormData] = useState({ content: "" })
  const [messages, setMessages] = useState([])
  const [messageUpdate, setMessageUpdate] = useState(false)
  const [users, setUsers] = useState([])
  // console.log(messages)

  useEffect(() => {
    const cable = createConsumer("ws://devmaster-kg.herokuapp.com//cable")

    const paramsToSend = {
        channel: "ConversationChannel",
        id: currentConversation.id
    }
    const handlers = {
        received(data) {
          setMessageUpdate(messageUpdate => !messageUpdate)
        },
        connected() {
            console.log("connected")
        },
        disconnected() {
            console.log("disconnected")
        }
    }
    const subscription = cable.subscriptions.create(paramsToSend, handlers)

    return function cleanup() {
        console.log("unsubbing from ", currentConversation.id)
        subscription.unsubscribe()
    }
  }, [messages, currentConversation.id])


  useEffect(() => {
    fetch(`/conversations/${currentConversation.id}`)
    .then(r => r.json())
    .then(data => {
      setMessages(data)
    })
  }, [messageUpdate, currentConversation.id])

  function handleSendMessage () {
    const message = {...formData, user_id: user.id, conversation_id: currentConversation.id}
    fetch('/messages', {
      method: 'POST',
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(message)
    })
    .then(res => res.json())
    .then(r => {
        setMessageUpdate((messageUpdate) => !messageUpdate)
    })

  }

  function onChangeMessage(event){
    const key= event.target.name;
    const value = event.target.value;
    setFormData({...formData, [key]:value})
  }

  useEffect(() => {
    fetch("/users")
    .then(r => r.json())
    .then(data => {
        setUsers(data)
        })
  }, [])

  return (
    <>
      <Box sx={{border: "solid", borderRadius: "20px", width: "100%", height: "85vh", position: "relative", backgroundColor: "black"}}>
        <ChatInvite user={user} users={users} currentConversation={currentConversation} setConvoUpdate={setConvoUpdate}/>
        <ChatDelete currentConversation={currentConversation} setConvoUpdate={setConvoUpdate} setCurrentConversation={setCurrentConversation}/>
        <Box sx={{width: "80%", height: "100%", margin: "10px auto", textAlign: "center"}}>
          <Typography component="h1" variant="h4" sx={{my: "30px"}} color="white">Conversation: <span style={{color: "#14a37f"}}>{currentConversation.title} </span></Typography>
          <Box sx={{ height: "80%", display: "flex", flexDirection: "column", overflow: "auto"}}>
            {messages.filter(m => m.content !== null).map(m => {
              if (m.user_id === user.id) {
                return (
                    <Box sx={{maxWidth: "60%", alignSelf: "flex-start", my: "3px"}} key={m.id}>
                      <Box sx={{backgroundColor: "#14a37f", padding: "15px", borderRadius: "30px 30px 30px 1px"}}>
                        <Typography component="div" variant="h7" >{m.content}</Typography>
                        {/* <Typography component="div" variant="h7" ><ClearIcon onClick={handleDelete} sx={{height: 13, width: 13, cursor: "pointer"}}/> {m.content}</Typography> */}
                      </Box>
                      <Avatar alt={user.username} src={user.avatar} sx={{height: 20, width: 20}}/>
                    </Box>
                )
              }
              return (
                <Box sx={{maxWidth: "60%", alignSelf: "flex-end", my: "3px", position: "relative"}} key={m.id}>
                    <Box sx={{backgroundColor: "white", padding: "15px", borderRadius: "30px 30px 1px 30px"}}>
                      <Typography component="div" variant="h7" >{m.content}</Typography>
                    </Box>
                    <Avatar alt={users.find(user => user.id === m.user_id) ? users.find(user => user.id === m.user_id).username : "Loading"} src={users.find(user => user.id === m.user_id) ? users.find(user => user.id === m.user_id).avatar : "Loading"} sx={{height: 20, width: 20, position: "absolute", right: "0"}}/>
                </Box>
              )
            })}
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", position: "absolute", bottom: "20px", left: "55%", transform: "translate(-50%, 0)", width: "100%"}}>
          <Box xs="sm" sx={{width: "70%", bgcolor: "white", padding: "15px", borderRadius: "10px"}}>
            <TextField 
                  placeholder="Type a message here" 
                  variant="standard" 
                  color="secondary" 
                  onChange={onChangeMessage} 
                  value={formData.content}
                  name="content"
                  fullWidth
            />
          </Box>  
          <Box sx={{width: "20%"}}>
            <Button sx={{ml: "20px", mt: "15px"}} variant="contained" color="secondary" onClick={handleSendMessage}>Send</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ChatContent