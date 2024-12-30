import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  // TODO: Implement authentication logic

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">
        {isLogin ? 'Login' : 'Sign Up'}
      </h1>
      <div className="bg-white shadow rounded-lg p-6">
        {/* TODO: Add auth form */}
      </div>
    </div>
  );
};

export default Auth;