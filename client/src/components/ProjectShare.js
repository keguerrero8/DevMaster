import React, {useEffect, useState} from 'react'
import {Button, TextField, Box, Modal, List, ListItem, ListItemText, ListItemAvatar, Divider, Typography, Avatar} from '@mui/material';
import { IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';


function ProjectShare({ project, user, setProjectUpdate }) {
    const [open, setOpen] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false)
    const [users, setUsers] = useState([])
    const [collaborators, setCollaborators] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [errors, setErrors] = useState(null)
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setShowUpdate(false)
        setProjectUpdate((isChange => !isChange))
    };

    useEffect(() => {
        fetch("/users")
        .then(r => r.json())
        .then(data => {
            setUsers(data)
            })
    }, [])

    useEffect(() => {
        fetch(`/project-collaborators/${project.id}`)
        .then(r => r.json())
        .then(data => {
            setCollaborators(data)
            })
    }, [project.id])

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

    function handleShare (event) {
        fetch("/user_projects", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: users.find((user) => user.username === event.target.innerText).id,
                project_id: project.id
            })
        })
        .then(r => {
            if (r.ok) {
                r.json().then(res => {
                    setOpen(true)
                    setShowUpdate(true)
                })
            }
            else {
                r.json().then((err) => {
                    setShowUpdate(false)
                    setErrors(err.errors)
                })
            }
        })            
    }

    function handleSearch (event) {
        setSearchValue(event.target.value)
    }

    const filteredUsers = users.filter(user => user.username.toLowerCase().startsWith(searchValue.toLowerCase())).filter(otherUser => otherUser.username !== user.username)

  return (
    <>
        <IconButton sx={{position: "absolute", right: "2px", top: "2px"}} onClick={handleOpen}>
            <ShareIcon color="secondary" sx={{ fontSize: 25 }}/>
        </IconButton>
        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    
                    <Typography component="h1" variant="h5">Share with people</Typography>
                    <TextField
                        margin="normal"
                        label="Search User..."
                        name="title"
                        variant="outlined"
                        size="small"
                        onChange={handleSearch}
                        value={searchValue}
                        fullWidth
                        color="secondary"
                    />
                    {errors ? errors.map((e) => <Typography key={e} variant="subtitle1" component="h2" gutterBottom sx={{color: "red"}}>{e} </Typography>) : null}
                    {showUpdate ? <h4>Successfully Shared!</h4> : null}
                    <Box sx={{border: "solid black", borderRadius: "5px", maxHeight: "60vh", overflow: "scroll"}}>
                        <List sx={{margin: "auto", width: "90%"}}>
                            {filteredUsers.map((user) => {
                                return (
                                    <ListItem onClick={handleShare} key={user.id} sx={{backgroundColor: "black", '&:hover': {backgroundColor: "#14a37f"}}}>
                                        <ListItemAvatar>
                                            <Avatar src={user.avatar}/>
                                        </ListItemAvatar>
                                        <ListItemText primary={user.username} sx={{color: "white", cursor: "pointer", padding: "5px"}}/>
                                        <Divider />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Box>
                    <Typography component="h1" variant="h5" sx={{mt: "20px"}}>Current Collaborators</Typography>
                    <Box sx={{border: "solid black", borderRadius: "5px", maxHeight: "20vh", overflow: "scroll"}}>
                        <List sx={{margin: "auto", width: "90%"}}>
                            {collaborators.map((user) => {
                                return (
                                    <ListItem key={user.id} sx={{backgroundColor: "black", '&:hover': {backgroundColor: "#14a37f"}}}>
                                        <ListItemAvatar>
                                            <Avatar src={user.avatar}/>
                                        </ListItemAvatar>
                                        <ListItemText primary={user.username} sx={{color: "white"}}/>
                                        <Divider />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Box>
                    <Button onClick={handleClose} sx={{position: "absolute", right: "0px"}}>CLOSE</Button>
                </Box>
        </Modal>
    </>
  )
}

export default ProjectShare;