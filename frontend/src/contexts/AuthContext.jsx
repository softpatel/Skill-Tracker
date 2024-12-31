import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, setAuthToken, getAuthToken, removeAuthToken } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored token on mount
    const token = getAuthToken();
    if (token) {
      // TODO: Implement token validation endpoint
      // For now, just get user data from stored token
      try {
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        setUser({
          id: tokenData.userId,
          // Other user data would come from an API call
        });
      } catch (error) {
        console.error('Token validation failed:', error);
        removeAuthToken();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.auth.login(email, password);
      setAuthToken(response.token);
      setUser(response.user);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const signup = async (email, password, name) => {
    try {
      const response = await api.auth.signup(email, password, name);
      setAuthToken(response.token);
      setUser(response.user);
      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const logout = () => {
    removeAuthToken();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};