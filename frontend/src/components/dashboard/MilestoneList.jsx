import React from 'react';

const MilestoneList = () => {
  // TODO: Implement milestone fetching and tracking
  const mockMilestones = [];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Upcoming Milestones</h3>
      <div className="space-y-4">
        {mockMilestones.map(milestone => (
          <div 
            key={milestone.id}
            className="flex items-center justify-between p-4 border rounded"
          >
            <div>
              <h4 className="font-medium">{milestone.title}</h4>
              <p className="text-sm text-gray-600">{milestone.dueDate}</p>
            </div>
            <div className="flex items-center gap-2">
              {/* TODO: Add completion toggle */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MilestoneList;