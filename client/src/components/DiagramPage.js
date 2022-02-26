import React, { useState, useEffect } from 'react';
import ReactFlow, { removeElements, addEdge, Controls, MiniMap, Background } from 'react-flow-renderer';
import { useParams } from 'react-router-dom'

// const initialElements = [
//     {
//       id: "1",
//       type: 'input', // input node
//       data: { label: 'Input Node' },
//       position: { x: 150, y: 25 }
//     },
//     // default node
//     {
//       id: "2",
//       // you can also pass a React component as a label
//       data: { label: <div>Deflt Node</div> },
//       position: { x: 100, y: 125 }
//     },
//     {
//       id: "3",
//       type: 'output', // output node
//       data: { label: 'Output Node how much can I fit in here ' },
//       position: { x: 250, y: 250 },
//     },
//     // animated edge
//     { id: "4", source: "1", target: "2", animated: true },
//     { id: "5", source: "2", target: "3"},
//     {
//       id: "6",
//       // you can also pass a React component as a label
//       data: { label: <div>Default Node</div> },~
//       position: { x: 10, y: 125 },
//     },
//     {
//       id: "7",
//       // you can also pass a React component as a label
//       data: { label: <div>Default Node</div> },
//       position: { x: 10, y: 125 },
//     },
//     { id: "8", source: "6", target: "7"},
//   ];
  
  function DiagramPage() {
    const params = useParams()
    const [elements, setElements] = useState([]);
    const [name, setName] = useState("")
    const onElementsRemove = (elementsToRemove) => {
      console.log(elementsToRemove)
      setElements((els) => removeElements(elementsToRemove, els))
    };

    // useEffect(() => {
    //     fetch(`/graphs/${params.id}`)
    //     .then(r => r.json())
    //     .then(data => {
    //         const clientData = data.map((node) => {
    //             if (node.data == null) {
    //                 //this is a connect so return connect object
    //                 return (
    //                     {
    //                         id: node.id.toString(),
    //                         source: node.source, 
    //                         target: node.target,
    //                     }
    //                 )
    //             }
    //             else {
    //                 return (
    //                     {
    //                         id: node.id.toString(),
    //                         data: JSON.parse(node.data),
    //                         position: JSON.parse(node.position)
    //                     }
    //                 )
    //             }
    //         })

    //         setElements(clientData)
    //         console.log(clientData)
    //     })
    // }, [])

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
      // console.log(params)
      let connectNode = {source: parameter.source, target: parameter.target, graph_id: parseInt(params.id)}
      fetch('/nodes', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(connectNode)
        })
        .then(res => res.json())
        .then(newNode => {
            setElements((els) => addEdge({id: newNode.id.toString(), source: newNode.source, target: newNode.target}, els))
        })
    //   setElements((els) => addEdge({id: (els.length + 1).toString(), source: params.source, target: params.target}, els))
    };
    console.log(elements)

    const onNodeDragStop = (event, node) => {
        console.log(node.position)
        const updateNode = {
            position: JSON.stringify({x: node.position.x, y: node.position.y})
        }
        fetch(`/nodes/${node.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateNode)
        })
        .then(r => r.json())
        .then((updatedNode) => {
            // setElements((els) => addEdge({id: updateNode.id.toString(), source: params.source, target: params.target}, els))
        })
        // let obj = {id: "8", source: params.source, target: params.target}
        // setElements((els) => addEdge({id: (els.length + 1).toString(), source: params.source, target: params.target}, els))
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