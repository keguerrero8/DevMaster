import React, { useState, useEffect } from 'react';
import ReactFlow, { removeElements, addEdge, Controls, MiniMap, Background } from 'react-flow-renderer';
import { useParams } from 'react-router-dom'
import { Modal, TextField, Button, ListItemText, ListItemIcon, ListItem, List, Typography, Box } from '@mui/material';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import AddIcon from '@mui/icons-material/Add';
import CableIcon from '@mui/icons-material/Cable';
import DeleteIcon from '@mui/icons-material/Delete';


//     {
//       id: "1",
//       type: 'input', // input node
//       data: { label: 'Input Node' },
//       position: { x: 150, y: 25 }
//     },
//     // default node has no type
//     {
//       id: "3",
//       type: 'output', // output node
//       data: { label: 'Output Node how much can I fit in here ' },
//       position: { x: 250, y: 250 },
//     },
//     // animated edge
//     { id: "4", source: "1", target: "2", animated: true },
//     { id: "5", source: "2", target: "3"},
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
  
  function DiagramPage() {
    const params = useParams()
    const [connectUpdate, setConnectUpdate] = useState(null)
    const [showUpdate, setShowUpdate] = useState(false)
    const [formData, setFormData] = useState({ label: "" })
    const [elements, setElements] = useState([]);
    const [name, setName] = useState("")
    const [isNodeUpdated, setNodeUpdated] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setShowUpdate(false)
        setOpen(false)
    };
    console.log(elements)

    useEffect(() => {
        fetch(`/diagrams/${params.id}`)
        .then(r => r.json())
        .then(data => {
            const clientData = data.map((node) => {
                if (node.source == null) {
                    return {
                        id: node.id.toString(),
                        data: { label: node.label },
                        position: { x: node.positionx, y: node.positiony }
                    }}
                    return {
                            id: node.id.toString(),
                            source: node.source, 
                            target: node.target,
                            label: node.label,
                            arrowHeadType: 'arrow'
                        }
                })
            setElements(clientData)
        })
    }, [isNodeUpdated])

    const onElementsRemove = (elementsToRemove) => {
        const idsToRemove = elementsToRemove.map(e => parseInt(e.id))
        fetch('/delete', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({toRemove: idsToRemove})
        })
        setElements((els) => removeElements(elementsToRemove, els))
    };
  
    //add node
    const addNode = () => {
        const node = {
            label: `${name}`,
            positionx: Math.random() * window.innerWidth,
            positiony: Math.random() * window.innerWidth,
            diagram_id: parseInt(params.id) 
        }
        
        fetch('/nodes', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(node)
        })
        .then(res => res.json())
        .then(newNode => {
            setElements((e) => e.concat({
                id: newNode.id.toString(),
                data: {label: newNode.label},
                position: {x: newNode.positionx, y: newNode.positiony}
              }))
        })
    }
  
    //add connection
    const onConnect = (parameter) => {
      let connectNode = {source: parameter.source, target: parameter.target, diagram_id: parseInt(params.id)}
      fetch('/nodes', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(connectNode)
        })
        .then(res => res.json())
        .then(newConnect => {
            setElements((els) => addEdge({id: newConnect.id.toString(), source: newConnect.source, target: newConnect.target, arrowHeadType: 'arrow'}, els))
        })
    };

    const onNodeDragStop = (event, node) => {
        const updateNode = {
            positionx: node.position.x, 
            positiony: node.position.y
        }
        fetch(`/nodes/${node.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateNode)
        })
        .then(r => r.json())
        .then(setNodeUpdated(!isNodeUpdated))
      };

    const handleEdgeClick = (event, element) => {
        console.log(element)
        if (element.source !== undefined) {
            handleOpen()
            setConnectUpdate(parseInt(element.id))
        }
    }
    
    function handleSubmit(event){
        event.preventDefault()
        fetch(`/nodes/${connectUpdate}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(r => {
            setNodeUpdated(!isNodeUpdated)
            setShowUpdate(true)
        })
    }

    function onChange(event){
        const key= event.target.name;
        const value = event.target.value;
        setFormData({...formData, [key]:value})
    }
  
    return (
        <>
        <Box sx={{width: "90%", margin: "20px auto", textAlign: "center"}}>
            <Typography component="h1" variant="h4" sx={{marginBottom: "10px"}}>About this tool:</Typography>
            <Box sx={{margin: "40px auto"}}>
                <List dense={true} sx={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "10px"}}>
                    <ListItem sx={{'&:hover': {transform: "scale(1.1)"}}}>
                        <ListItemIcon>
                            <AddIcon color="secondary"/>
                        </ListItemIcon>
                        <ListItemText
                            primary="Create nodes"
                        />
                    </ListItem>
                    <ListItem sx={{'&:hover': {transform: "scale(1.1)"}}}>
                        <ListItemIcon>
                            <CableIcon color="secondary"/>
                        </ListItemIcon>
                        <ListItemText
                            primary="Drag connections between nodes"
                        />
                    </ListItem>
                    <ListItem sx={{'&:hover': {transform: "scale(1.1)"}}}>
                        <ListItemIcon>
                            <DeleteIcon color="secondary"/>
                        </ListItemIcon>
                        <ListItemText
                            primary="Delete nodes with backspace key"
                        />
                    </ListItem>
                    <ListItem sx={{'&:hover': {transform: "scale(1.1)"}}}>
                        <ListItemIcon>
                            <MoveDownIcon color="secondary"/>
                        </ListItemIcon>
                        <ListItemText
                            primary="Drag nodes to reposition them"
                        />
                    </ListItem>
                </List>
            </Box>
            <input type="text" name="title" onChange={e => setName(e.target.value)} placeholder="Enter Node Name" id="create-node" />
            <Button variant="contained" size="small" color="primary" onClick={addNode}>Create Node</Button>
        </Box>
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
                        label="Connection Name"
                        name="label"
                        variant="outlined"
                        size="small"
                        onChange={onChange}
                        value={formData.label}
                        fullWidth
                        color="secondary"
                    />
                    {showUpdate ? <h4>Successfully updated!</h4> : null}
                    <Box>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            fullWidth
                            color="secondary"
                        >
                            Update 
                        </Button>
                    </Box>
                    <Button onClick={handleClose} sx={{position: "absolute", right: "0px"}}>CLOSE</Button>
            </Box>
        </Modal>       
        <Box sx={{width: "90%", height: "90vh", margin: "30px auto", border: "solid", borderRadius: "20px"}}>
          <ReactFlow 
          elements={elements}
          onConnect={onConnect}
          onElementsRemove={onElementsRemove}
          onNodeDragStop={onNodeDragStop}
          deleteKeyCode={8}
          onElementClick={handleEdgeClick}
          >
            <Background
              variant="dots"
              gap={12}
            />        
            <MiniMap nodeColor="#14a37f"/>
            <Controls />
          </ReactFlow>
        </Box>
        </>
    );
  }
  
  export default DiagramPage;