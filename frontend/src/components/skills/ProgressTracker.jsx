import React from 'react';
import { useSkills } from '../../contexts/SkillContext';

const ProgressTracker = ({ skillId }) => {
  // TODO: Implement progress tracking logic
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Track Your Progress</h3>
      <div className="flex items-center gap-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Log Progress
        </button>
      </div>
    </div>
  );
};

export default ProgressTracker;