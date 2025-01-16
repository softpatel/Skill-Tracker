import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.email, formData.password, formData.name);
      }
      // Navigation will be handled by the useEffect above
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = "mt-1 block w-full rounded-md bg-indigo-900/50 border border-indigo-500/50 text-white placeholder-indigo-400 hover:border-indigo-400/50 focus:ring-indigo-500 focus:border-indigo-500 transition-colors";
  const labelStyles = "block text-sm font-medium text-indigo-200";

  return (
    <div className="max-w-md mx-auto mt-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p className="text-indigo-200">
          {isLogin 
            ? 'Track your skill development journey'
            : 'Start your skill development journey today'}
        </p>
      </div>

      {/* Auth Form */}
      <div className="relative">
        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-32 h-32 bg-indigo-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-indigo-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        
        <div className="relative bg-indigo-800/50 shadow-lg rounded-lg p-6 border border-indigo-700/50">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className={labelStyles}>
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputStyles}
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}
            
            <div>
              <label className={labelStyles}>
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputStyles}
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className={labelStyles}>
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={inputStyles}
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-900/50 text-red-200 p-3 rounded-md border border-red-700">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loading size="small" />
                  <span>{isLogin ? 'Logging in...' : 'Creating account...'}</span>
                </div>
              ) : (
                <>{isLogin ? 'Login' : 'Sign Up'}</>
              )}
            </Button>
          </form>

          {/* Switch between login and signup */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setFormData({ email: '', password: '', name: '' });
              }}
              className="text-indigo-300 hover:text-indigo-200 transition-colors"
            >
              {isLogin 
                ? 'Need an account? Sign up' 
                : 'Already have an account? Login'}
            </button>
          </div>
        </div>
      </div>

      {/* Optional: Add feature highlights or social proof */}
      <div className="mt-8 grid grid-cols-2 gap-4 text-center">
        <div className="bg-indigo-900/30 p-4 rounded-lg border border-indigo-700/50">
          <div className="text-xl mb-1">📈</div>
          <h3 className="text-white text-sm font-medium">Track Progress</h3>
          <p className="text-indigo-300 text-xs mt-1">Visualize your growth</p>
        </div>
        <div className="bg-indigo-900/30 p-4 rounded-lg border border-indigo-700/50">
          <div className="text-xl mb-1">🎯</div>
          <h3 className="text-white text-sm font-medium">Set Goals</h3>
          <p className="text-indigo-300 text-xs mt-1">Achieve milestones</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;