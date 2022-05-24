import React, { useState } from 'react'
import { Box, Typography, Button, IconButton, Modal} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

function ChatDelete({currentConversation, setConvoUpdate, setCurrentConversation}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
      setOpen(false)
  };

  function handleDelete () {
    fetch(`/conversations/${currentConversation.id}`, {
        method: "DELETE"
    }).then(res => {
        setConvoUpdate(update => !update)
        setCurrentConversation(null)
    })
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
      xs: "70%",
      md: "40%",
      lg: "30%"
    },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: "center"
  };

  return (
    <>
        <IconButton onClick={handleOpen} sx={{position: "absolute", left: "2px", top: "2px"}} >
            <ClearIcon 
            color="secondary" 
            sx={{ 
              fontSize: {
                xs: "1.5rem",
                md: "1.7rem",
                lg: "2rem"
              }
            }}
            />
        </IconButton>
        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    
                    <Typography sx={{mb: "25px"}} component="h1" variant="h6">Are you sure you want to delete this conversation and all message history?</Typography>
                    <Button variant="outlined" size="small" onClick={handleDelete} sx={{mr: "10px"}}>Delete</Button>
                    <Button variant="outlined" size="small" onClick={handleClose}>Cancel</Button>
                </Box>
        </Modal>
    </>
  );
}

export default ChatDelete