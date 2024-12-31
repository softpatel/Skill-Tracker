import React from 'react';

const UserProfile = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="bg-gray-200 rounded-full w-20 h-20 flex items-center justify-center">
            {/* TODO: Add profile image */}
            <span className="text-2xl text-gray-600">👤</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold">John Doe</h3>
            <p className="text-gray-600">Member since 2024</p>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2">About Me</h4>
          <p className="text-gray-600">Add a short bio to tell people about yourself...</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;