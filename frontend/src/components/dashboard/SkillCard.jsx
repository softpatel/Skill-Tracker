import React from 'react';
import { Link } from 'react-router-dom';

const SkillCard = ({ skill }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-2">{skill?.title}</h3>
      <div className="space-y-4">
        <div className="h-2 bg-gray-200 rounded">
          <div 
            className="h-full bg-blue-500 rounded" 
            style={{ width: `${skill?.progress || 0}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>{skill?.timeSpent || 0} hours invested</span>
          <span>{skill?.progress || 0}% complete</span>
        </div>
        <Link 
          to={`/skill/${skill?.id}`}
          className="block text-center text-blue-500 hover:text-blue-600"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default SkillCard;