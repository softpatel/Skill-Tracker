import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ProgressChart = ({ timeEntries = [], milestones = [] }) => {
  const chartData = useMemo(() => {
    // Create a map of dates to milestone completions
    const milestoneCompletions = new Map(
      milestones
        .filter(m => m.completed)
        .map(m => [
          new Date(m.updatedAt).toISOString().split('T')[0],
          m.title
        ])
    );

    // Process time entries into daily aggregates with milestone info
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
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Progress Over Time</h3>
        <p className="text-gray-500 text-center py-8">
          Start tracking your progress to see your journey visualized here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Progress Over Time</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={Object.values(chartData)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              tickFormatter={(date) => {
                const d = new Date(date);
                return `${d.getMonth() + 1}/${d.getDate()}`;
              }}
            />
            <YAxis 
              yAxisId="left"
              tick={{ fontSize: 12 }}
              label={{ 
                value: 'Time Spent (hours)', 
                angle: -90, 
                position: 'insideLeft',
                style: { fontSize: 12 }
              }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-3 border rounded shadow-lg">
                      <p className="font-medium">
                        {new Date(data.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm">
                        Time Spent: {data.timeSpent.toFixed(1)} hours
                      </p>
                      {data.milestone && (
                        <p className="text-sm text-green-600 mt-1">
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
              stroke="#3B82F6"
              strokeWidth={2}
              dot={true}
              yAxisId="left"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;