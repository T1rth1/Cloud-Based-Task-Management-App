import React from 'react'
import { Bar,BarChart, CartesianGrid,Legend,ResponsiveContainer,Tooltip,XAxis,YAxis} from "recharts";

const Chart = ({data}) => {
  return (
    // this is the fixed code coming from the headless UI so no worries to understand this
    <ResponsiveContainer
        width={'100%'}
        height={500}    
    >
        <BarChart widht={150} height={40} data={data}> 
        {/* based on this chart data it will print out the bar graph internally */}
        <XAxis dataKey="name"/> {/* x axis data key */}
        <YAxis dataKey="total"/>
        <Tooltip/>
        <Legend/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Bar
            dataKey="total"
            fill="#8884d8" // color of the bar graph
        />
        </BarChart>
    </ResponsiveContainer>
  )
}

export default Chart