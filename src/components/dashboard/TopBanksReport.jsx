import React from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar, LabelList } from 'recharts';
import './TopBanksReport.css';

const TopBanksReport = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="no-data-message">No data available for top banks.</p>;
  }

  return (
    <div className="top-banks-report">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 40, left: 100, bottom: 20 }}
          barCategoryGap="30%"
        >
          <defs>
            <linearGradient id="banksGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6ee7b7" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
          <XAxis
            type="number"
            tickFormatter={(value) => `₦${(value / 1000000).toFixed(1)}M`}
            tick={{ fill: '#64748b', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={150}
            tick={{ fill: '#334155', fontSize: 14 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value) => `₦${value.toLocaleString()}`}
            labelFormatter={(label) => label}
            contentStyle={{ borderRadius: 8, borderColor: '#e2e8f0' }}
          />
          <Bar dataKey="revenueCollected" fill="url(#banksGradient)" barSize={24} radius={[4, 4, 4, 4]} animationDuration={800}>
            <LabelList
              dataKey="revenueCollected"
              position="right"
              formatter={(value) => `₦${(value / 1000000).toFixed(1)}M`}
              fill="#1e293b"
              style={{ fontWeight: 600 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopBanksReport;