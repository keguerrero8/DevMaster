import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

  function BarGraph({projects}) {

    const data = projects.map((project) => {
        return {
            name: project.title,
            "Not Started" : project.tasks.filter(task => task.status === "Not Started").length,
            "In Progress" : project.tasks.filter(task => task.status === "In Progress").length,
            "Completed" : project.tasks.filter(task => task.status === "Completed").length
        }
    })
  
    return (
        <div style={{margin: "auto", display: "flex", justifyContent: "center"}}>
            <BarChart
                width={900}
                height={400}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Not Started" stackId="a" fill="black" />
                <Bar dataKey="In Progress" stackId="a" fill="#82ca9d" />
                <Bar dataKey="Completed" stackId="a" fill="#14a37f" />
            </BarChart>
        </div>
    );
  }
  
  export default BarGraph;