import React, { useState } from 'react';

const MilestoneForm = ({ onSubmit, skillId }) => {
  const [milestone, setMilestone] = useState({
    title: '',
    dueDate: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...milestone, skillId });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Milestone Title
        </label>
        <input
          type="text"
          value={milestone.title}
          onChange={(e) => setMilestone({ ...milestone, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter milestone title"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
      >
        Add Milestone
      </button>
    </form>
  );
};

export default MilestoneForm;