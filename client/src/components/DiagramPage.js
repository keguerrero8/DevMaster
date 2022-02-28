import React, { useState, useEffect } from 'react';
import ReactFlow, { removeElements, addEdge, Controls, MiniMap, Background } from 'react-flow-renderer';
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import AddIcon from '@mui/icons-material/Add';
import CableIcon from '@mui/icons-material/Cable';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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
  
  function DiagramPage() {
    const params = useParams()
    const [elements, setElements] = useState([]);
    const [name, setName] = useState("")
    const [isNodeUpdated, setNodeUpdated] = useState(false)
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
            setElements((els) => addEdge({id: newConnect.id.toString(), source: newConnect.source, target: newConnect.target}, els))
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
            console.log("modal to edit label")
        }
    } 
  
    return (
        <>
        <Box sx={{width: "90%", margin: "20px auto", textAlign: "center"}}>
            <Typography component="h1" variant="h4" sx={{marginBottom: "10px"}}>About this tool:</Typography>
            <Box sx={{margin: "20px auto"}}>
                <List dense={true} sx={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "10px"}}>
                    <ListItem>
                    <ListItemIcon>
                        <AddIcon color="secondary"/>
                    </ListItemIcon>
                    <ListItemText
                        primary="Create nodes"
                    />
                    </ListItem>
                    <ListItem>
                    <ListItemIcon>
                        <CableIcon color="secondary"/>
                    </ListItemIcon>
                    <ListItemText
                        primary="Drag connections between nodes"
                    />
                    </ListItem>
                    <ListItem>
                    <ListItemIcon>
                        <DeleteIcon color="secondary"/>
                    </ListItemIcon>
                    <ListItemText
                        primary="Delete nodes with backspace key"
                    />
                    </ListItem>
                    <ListItem>
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
            {/* <TextField size="small" name="title" label="Node name" variant="standard" onChange={e => setName(e.target.value)}/> */}
            <Button variant="contained" size="small" color="primary" onClick={addNode}>Create Node</Button>
        </Box>
        <Box sx={{width: "90%", height: "90vh", margin: "20px auto", border: "solid", borderRadius: "20px"}}>
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
            <MiniMap />
            <Controls />
          </ReactFlow>
        </Box>
        </>
    );
  }
  
  export default DiagramPage;