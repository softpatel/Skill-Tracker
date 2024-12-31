import React from 'react';
import UserProfile from '../components/profile/UserProfile';
import TrophyCabinet from '../components/profile/TrophyCabinet';

const Profile = () => {
  // TODO: Fetch user profile data and achievements
  return (
    <div className="space-y-8">
      <UserProfile />
      <TrophyCabinet />
    </div>
  );
};

export default Profile;