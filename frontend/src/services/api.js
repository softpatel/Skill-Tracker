const API_URL = 'http://localhost:5005/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
};

export const api = {
  auth: {
    login: async (email, password) => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
      }
      
      return response.json();
    },

    signup: async (email, password, name) => {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Signup failed');
      }
      
      return response.json();
    },
  },

  profile: {
    getProfile: async () => {
      const response = await fetch(`${API_URL}/users/profile`, {
        headers: getHeaders(),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch profile');
      }

      return response.json();
    },

    updateProfile: async (profileData) => {
      const response = await fetch(`${API_URL}/users/profile`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update profile');
      }

      return response.json();
    },

    uploadProfileImage: async (file) => {
      const formData = new FormData();
      formData.append('profileImage', file);

      const response = await fetch(`${API_URL}/users/profile/image`, {
        method: 'POST',
        headers: {
          'Authorization': getAuthToken() ? `Bearer ${getAuthToken()}` : '',
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to upload profile image');
      }

      return response.json();
    },

    getAchievements: async () => {
      const response = await fetch(`${API_URL}/users/achievements`, {
        headers: getHeaders(),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch achievements');
      }

      return response.json();
    },
  },
};