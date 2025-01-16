import React from 'react';
import UserProfile from '../components/profile/UserProfile';
import TrophyCabinet from '../components/profile/TrophyCabinet';

const Profile = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <h1 className="text-3xl font-bold text-white mb-6">Your Profile</h1>
      <UserProfile />
      <TrophyCabinet />
    </div>
  );
};

export default Profile;