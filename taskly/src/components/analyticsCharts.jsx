// src/components/CircularChart.jsx
import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend
} from 'recharts';

let name = "Sample Name "

const statusData = [
    { name: 'Done', value: 12 },
    { name: 'In Progress', value: 7 },
    { name: 'Not finished', value: 5 },
];

const colors = ['#57b5fb', '#ff9966', '#df3a2f'];
//the thing is...recharts is a bit confusing to work with but it's okay. 
export const CircularChart = () => {
    return (
        <div className="analytics-card" style={{ width: '100%', height: 350, background: '#fff', padding: '20px', borderRadius: '16px', position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={statusData}
                        cx="50%"
                        cy="40%"
                        innerRadius={70}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                    >
                        {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}

                   
                    </Pie>
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', }}
                        
                    />
                    
                    <Legend
                        verticalAlign="bottom"
                        height={50}
                        formatter={(value, entry) => {
                            const dataValue = entry.payload.value;

                            return (
                                <span style={{ color: '#000000', fontWeight: 600, fontSize: '14px' }}>
                                    {value}: <span style={{ color: '#666666', fontWeight: 400 }}>{dataValue}</span>
                                    
                                </span>
                                
                            );
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
            <div>
                <h6 style={{ margin: -15, fontSize: '1rem', fontWeight: 600, lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'center'}}>{name}</h6>
            </div>
        </div>
    );
};