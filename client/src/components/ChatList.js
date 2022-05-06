import React, { useState } from 'react'
import { Box, Button, Typography, TextField, Modal, List, ListItem, ListItemText, ListItemAvatar, Divider, Avatar, AvatarGroup } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';

function ChatList({setCurrentConversation, conversations, setConvoUpdate}) {
    const [formData, setFormData] = useState({ title: "" })
    const [showUpdate, setShowUpdate] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setShowUpdate(false)
    };

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
    <Box sx={{width: "100%", height: "85vh", textAlign: "center", borderRadius: "20px", backgroundColor: "black"}}>
        <Button
            variant="contained"
            sx={{ my: "20px", mb: 2}}
            color="secondary"
            size="small"
            onClick={handleOpen}
        >
            <MessageIcon sx={{mr: 1, fontSize: "1rem"}}></MessageIcon>
            <Typography component="h3" variant="subtitle2" sx={{ color: "white", fontSize: "min(1.3vw, 15px)" }}>New Convo</Typography>
        </Button>
        <Typography component="h1" variant="h4" sx={{fontWeight: "bold", color: "white", my: "20px"}}>Chats</Typography>
        <List sx={{margin: "auto", width: "90%", overflow: "auto"}}>
            {conversations.map(convo => {
                return (
                    <Box key={convo.id}>
                        <ListItem onClick={handleClick} sx={{backgroundColor: "white", '&:hover': {backgroundColor: "#14a37f"}}}>
                            <ListItemAvatar>
                                <AvatarGroup >
                                    {convo.participants.map(u => <Avatar key={u.id} alt={u.username} src={u.avatar}/>)}
                                </AvatarGroup>
                            </ListItemAvatar>
                            <ListItemText primary={convo.title} sx={{color: "black", cursor: "pointer", padding: "5px"}}/>
                        </ListItem>
                        <Divider />
                    </Box>
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