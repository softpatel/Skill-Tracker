import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import CreateSkill from './pages/CreateSkill';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import { AuthProvider } from './contexts/AuthContext';
import { SkillProvider } from './contexts/SkillContext';

const App = () => {
  return (
    <AuthProvider>
      <SkillProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-skill" element={<CreateSkill />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </SkillProvider>
    </AuthProvider>
  );
};

export default App;