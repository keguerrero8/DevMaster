import React, { useState, useEffect } from 'react';
import ReactFlow, { removeElements, addEdge, Controls, MiniMap, Background } from 'react-flow-renderer';
import { useParams } from 'react-router-dom'

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
        // not sure if diagram_id is needed
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
  
    return (
        <div style={{width: "100%", height: "90vh", margin: "auto"}}>
          <ReactFlow 
          elements={elements}
          onConnect={onConnect}
          onElementsRemove={onElementsRemove}
          onNodeDragStop={onNodeDragStop}
          deleteKeyCode={8} 
          >
            <Background
              variant="dots"
              gap={12}
              style={{backgroundColor: "lightBlue"}}
            />        
            <MiniMap />
            <Controls />
          </ReactFlow>
          <div>
            <input type="text" name="title" onChange={e => setName(e.target.value)}/>
            <button type="button" onClick={addNode}>Add Node</button>
          </div>
        </div>
    );
  }
  
  export default DiagramPage;