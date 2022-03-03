import React, {useState, useEffect} from "react";
import {Button, TextField, Box, Link, Modal, List, ListItem, ListItemText, Divider} from '@mui/material';

function GithubSearch({setProjectUpdate, user, project}) {
    const [open, setOpen] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false)
    const [gitUserData, setGitUserData] = useState({})
    const [repos, setRepos] = useState([])
    const [searchValue, setSearchValue] = useState("")
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

    useEffect(() => {
        fetch(`https://api.github.com/users/${user.github_username}`)
        .then(r => r.json())
        .then(gitUser => setGitUserData(gitUser))
    }, [])
  
    // useEffect(() => {
    //     // https://api.github.com/users/keguerrero8/repos?type=all&page=5
    //     if (user.github_username === null) {
    //         return
    //     } else {
    //         fetch(`https://api.github.com/users/${user.github_username}/repos`)
    //         .then(r => r.json())
    //         .then(githutProjects => setRepos(githutProjects))
    //     }
    // }, [])

    useEffect(() => {
        if (gitUserData) {
            for (let i = 1; i <= Math.ceil(gitUserData.public_repos / 100); i++) {
                if (i > 5) {
                    break
                } else {
                    fetch(`https://api.github.com/users/${user.github_username}/repos?page=${i}&per_page=100`)
                    .then(r => r.json())
                    .then(githutProjects => setRepos(prevRepos => [...prevRepos, ...githutProjects]))
                }
            }
        }
    }, [gitUserData])
  
    function handleSearch (event) {
      setSearchValue(event.target.value)
    }

    function handleGithubLink (event) {
        fetch(`/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({github_link: repos.find((r) => r.name === event.target.innerText).html_url})
        })
        .then(r => r.json())
        .then(r => {
            setShowUpdate(true)
            setProjectUpdate((isProjectUpdate) => !isProjectUpdate)
        })
    }

    const filteredRepos = repos.filter(repo => repo.name.toLowerCase().startsWith(searchValue.toLowerCase()))

  return (
    <>
        {project.github_link ? (
            <>
                <Link href={project.github_link}>Github Repo Link</Link>
                <Button sx={{ml: "20px"}} variant="contained" onClick={handleOpen}>Update Github Repo Link</Button>
            </>
        ) : <Button sx={{ml: "20px"}} variant="contained" onClick={handleOpen}>Link Github Repo</Button>}

        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField
                        margin="normal"
                        label="Search Github repo..."
                        name="title"
                        variant="outlined"
                        size="small"
                        onChange={handleSearch}
                        value={searchValue}
                        fullWidth
                        color="secondary"
                    />
                    {showUpdate ? <h4>Successfully Linked!</h4> : null}
                    <Box sx={{border: "solid black", borderRadius: "5px", maxHeight: "60vh", overflow: "scroll"}}>
                        <List sx={{margin: "auto", width: "90%"}}>
                            {filteredRepos.map((repo) => {
                                return (
                                    <ListItem onClick={handleGithubLink} key={repo.name}>
                                        <ListItemText primary={repo.name} sx={{cursor: "pointer", padding: "5px", '&:hover': {backgroundColor: "lightblue"}}}/>
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
  );
}

export default GithubSearch;
