import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

  function BarGraph({projects}) {
    const [w, sizeWidth] = useState(window.innerWidth)
    const data = [...projects.solo, ...projects.share].map((project) => {
        return {
            name: project.title,
            "Not Started" : project.tasks.filter(task => task.status === "Not Started").length,
            "In Progress" : project.tasks.filter(task => task.status === "In Progress").length,
            "Completed" : project.tasks.filter(task => task.status === "Completed").length
        }
    })

    useEffect(() => {
        const handleResize = () => {
            sizeWidth(window.innerWidth)
        }

        window.addEventListener("resize", handleResize)
        
    }, [])
  
    return (
        <div style={{margin: "auto", maxWidth: "1400px"}}>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    // width={900}
                    // height={400}
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" hide={w > 768? false : true}/>
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Not Started" stackId="a" fill="#F93308" />
                    <Bar dataKey="In Progress" stackId="a" fill="#fad661" />
                    <Bar dataKey="Completed" stackId="a" fill="#08c414" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
  }
  
  export default BarGraph;