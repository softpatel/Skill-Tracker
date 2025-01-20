import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <nav className="bg-indigo-900 shadow-lg border-b border-indigo-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-bold text-xl text-white hover:text-indigo-200 transition-colors">
            Skill Tracker
          </Link>
          <div className="flex items-center gap-6">
            {user ? (
              <>
                <Link to="/dashboard" className="text-indigo-200 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <Link to="/profile" className="text-indigo-200 hover:text-white transition-colors">
                  Profile
                </Link>
                <Button 
                  variant="secondary" 
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button className="bg-indigo-600 hover:bg-indigo-500 text-white">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;