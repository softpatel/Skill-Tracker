import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ProgressChart = ({ timeEntries = [], milestones = [] }) => {
  const chartData = useMemo(() => {
    const milestoneCompletions = new Map(
      milestones
        .filter(m => m.completed)
        .map(m => [
          new Date(m.updatedAt).toISOString().split('T')[0],
          m.title
        ])
    );

    return timeEntries
      .reduce((acc, entry) => {
        const date = new Date(entry.date).toISOString().split('T')[0];
        if (!acc[date]) {
          acc[date] = {
            date,
            timeSpent: 0,
            milestone: milestoneCompletions.get(date)
          };
        }
        acc[date].timeSpent += entry.duration;
        return acc;
      }, {});
  }, [timeEntries, milestones]);

  if (!timeEntries.length) {
    return (
      <div className="bg-indigo-800/50 shadow-lg rounded-lg p-6 border border-indigo-700/50">
        <h3 className="text-xl font-semibold mb-4 text-white">Progress Over Time</h3>
        <p className="text-indigo-200 text-center py-8">
          Start tracking your progress to see your journey visualized here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-indigo-800/50 shadow-lg rounded-lg p-6 border border-indigo-700/50">
      <h3 className="text-xl font-semibold mb-4 text-white">Progress Over Time</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={Object.values(chartData)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4338ca" opacity={0.2} />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#c7d2fe' }}
              tickFormatter={(date) => {
                const d = new Date(date);
                return `${d.getMonth() + 1}/${d.getDate()}`;
              }}
            />
            <YAxis 
              yAxisId="left"
              tick={{ fill: '#c7d2fe' }}
              label={{ 
                value: 'Time Spent (hours)', 
                angle: -90, 
                position: 'insideLeft',
                style: { fill: '#c7d2fe' }
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#312e81',
                border: '1px solid #4338ca',
                borderRadius: '0.375rem',
                color: '#e0e7ff'
              }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-indigo-900 p-3 border border-indigo-700 rounded shadow-lg">
                      <p className="font-medium text-white">
                        {new Date(data.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-indigo-200">
                        Time Spent: {data.timeSpent.toFixed(1)} hours
                      </p>
                      {data.milestone && (
                        <p className="text-sm text-indigo-300 mt-1">
                          ✓ {data.milestone}
                        </p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="timeSpent"
              stroke="#818cf8"
              strokeWidth={2}
              dot={{ fill: '#6366f1', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#4f46e5' }}
              yAxisId="left"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;