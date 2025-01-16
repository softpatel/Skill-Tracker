import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import Button from '../common/Button';
import Loading from '../common/Loading';

const UserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: ''
  });
  const fileInputRef = useRef();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const profileData = await api.profile.getProfile();
      setProfile(profileData);
      setFormData({
        name: profileData.name || '',
        bio: profileData.bio || ''
      });
    } catch (err) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedProfile = await api.profile.updateProfile(formData);
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    try {
      setLoading(true);
      const response = await api.profile.uploadProfileImage(file);
      setProfile(prev => ({ ...prev, profileImage: response.profileImage }));
    } catch (err) {
      setError('Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-indigo-800/50 shadow-lg rounded-lg p-6 border border-indigo-700/50">
      <h2 className="text-2xl font-bold mb-4 text-white">User Profile</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div 
            className="relative group cursor-pointer"
            onClick={handleImageClick}
          >
            {profile?.profileImage ? (
              <img
                src={`http://localhost:5005${profile.profileImage}`}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover ring-2 ring-indigo-500"
              />
            ) : (
              <div className="bg-indigo-700 rounded-full w-20 h-20 flex items-center justify-center ring-2 ring-indigo-500">
                <span className="text-2xl text-white">
                  {profile?.name?.charAt(0)?.toUpperCase() || '👤'}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-indigo-900 bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <span className="text-white text-center text-sm">Change Photo</span>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="flex-1">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-indigo-200">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md bg-indigo-900/50 border-indigo-600 text-white placeholder-indigo-400
                             focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-indigo-200">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows="3"
                    className="mt-1 block w-full rounded-md bg-indigo-900/50 border-indigo-600 text-white placeholder-indigo-400
                             focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button type="submit">Save Changes</Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-white">{profile?.name}</h3>
                <p className="text-indigo-200">
                  Member since {new Date(profile?.joinedDate).toLocaleDateString()}
                </p>
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-white mb-2">About Me</h4>
                  <p className="text-indigo-200">
                    {profile?.bio || 'No bio added yet.'}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      {error && (
        <div className="mt-4 bg-red-900/50 text-red-200 p-4 rounded-lg border border-red-700">
          {error}
        </div>
      )}
    </div>
  );
};

export default UserProfile;