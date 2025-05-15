import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import './RevenueChart.css';

// Enhanced color palette
const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#94a3b8'];

const RevenueChart = ({ data }) => {
  // Custom tooltip content
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{payload[0].name}</p>
          <p className="tooltip-value">Revenue: <span>{payload[0].value}%</span></p>
        </div>
      );
    }
    return null;
  };
  
  // Custom legend renderer
  const renderLegend = (props) => {
    const { payload } = props;
    
    return (
      <ul className="custom-legend">
        {payload.map((entry, index) => (
          <li key={`legend-item-${index}`} className="legend-item">
            <div className="legend-color" style={{ backgroundColor: entry.color }}></div>
            <div className="legend-label">{entry.value}</div>
            <div className="legend-value">{entry.payload.value}%</div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="revenue-chart">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            innerRadius={40}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            paddingAngle={2}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            strokeWidth={2}
            stroke="#ffffff"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]}
                className="chart-cell"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            content={renderLegend}
            layout="vertical" 
            verticalAlign="middle" 
            align="right"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart; 