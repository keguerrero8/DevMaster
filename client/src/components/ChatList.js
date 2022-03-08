import React, { useState, useEffect } from 'react'
import { Box, Button, Typography, TextField, Modal, List, ListItem, ListItemText, ListItemAvatar, Divider, Avatar, AvatarGroup } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';

function ChatList({setCurrentConversation}) {
    const [formData, setFormData] = useState({ title: "" })
    const [showUpdate, setShowUpdate] = useState(false)
    const [conversations, setConversations] = useState([])
    const [convoUpdate, setConvoUpdate] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setShowUpdate(false)
    };

    useEffect(() => {
        fetch('/conversations')
        .then(r => r.json())
        .then(res => {
            setConversations(res)
        })
    }, [convoUpdate])

    // console.log(conversations)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        textAlign: "center"
      };

    function handleSubmit(event){
        event.preventDefault()
        console.log(formData)
        fetch('/conversations', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(newConvo=> {
            setConvoUpdate((convoUpdate) => !convoUpdate)
            setShowUpdate(true)
        })
    }

    function onChange(event){
        const key= event.target.name;
        const value = event.target.value;
        setFormData({...formData, [key]:value})
    }

    function handleClick (e) {
        setCurrentConversation(conversations.find((convo) => convo.title === e.target.innerText))
    }

  return (
    <>
    <Box sx={{border: "solid black", width: "100%", height: "85vh", textAlign: "center", borderRadius: "20px", backgroundColor: "black"}}>
        <Button
            variant="contained"
            sx={{ my: "20px", mb: 2}}
            color="secondary"
            size="small"
            onClick={handleOpen}
        >
            <MessageIcon sx={{mr: 1}}></MessageIcon>
            New Conversation
        </Button>
        <Typography component="h1" variant="h4" sx={{fontWeight: "bold", color: "white"}}>Chats</Typography>
        <List sx={{margin: "auto", width: "95%"}}>
            {conversations.map(convo => {
                return (
                    <ListItem onClick={handleClick}  key={convo.id} sx={{backgroundColor: "white", '&:hover': {backgroundColor: "#14a37f"}}}>
                        <ListItemAvatar>
                            <AvatarGroup >
                                {convo.users.map(u => <Avatar key={u.id} alt={u.username} src={u.avatar}/>)}
                            </AvatarGroup>
                        </ListItemAvatar>
                        <ListItemText primary={convo.title} sx={{color: "black", cursor: "pointer", padding: "5px"}}/>
                        <Divider />
                    </ListItem>
                )
            })}
        </List>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
                <Box component="form" noValidate onSubmit={handleSubmit} sx={style}>
                    <TextField
                        margin="normal"
                        required
                        label="Conversation title"
                        name="title"
                        variant="outlined"
                        size="small"
                        onChange={onChange}
                        value={formData.title}
                        fullWidth
                        color="secondary"
                    />
                    {showUpdate ? <h4>Conversation created!</h4> : null}
                    <Box>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            fullWidth
                            color="secondary"
                        >
                            Create conversation
                        </Button>
                    </Box>
                    <Button onClick={handleClose} sx={{position: "absolute", right: "0px"}}>CLOSE</Button>
                </Box>
        </Modal>
    </Box>
    </>
  );
}

export default ChatList