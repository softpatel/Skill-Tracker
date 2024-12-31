import React from 'react';

const TrophyCabinet = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Trophy Cabinet</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* TODO: Add actual achievements */}
        <div className="flex flex-col items-center p-4 border rounded-lg">
          <span className="text-3xl mb-2">🏆</span>
          <span className="text-sm text-center">First Skill Completed</span>
        </div>
      </div>
    </div>
  );
};

export default TrophyCabinet;