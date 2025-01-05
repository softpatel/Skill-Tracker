import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const SkillContext = createContext();

export const useSkills = () => {
  const context = useContext(SkillContext);
  if (!context) {
    throw new Error('useSkills must be used within a SkillProvider');
  }
  return context;
};

export const SkillProvider = ({ children }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const data = await api.skills.getAll();
      setSkills(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createSkill = async (skillData) => {
    try {
      const newSkill = await api.skills.create(skillData);
      setSkills(prevSkills => [...prevSkills, newSkill]);
      return newSkill;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateSkillProgress = async (skillId, progressData) => {
    try {
      const updatedSkill = await api.skills.updateProgress(skillId, progressData);
      setSkills(prevSkills =>
        prevSkills.map(skill =>
          skill._id === skillId ? updatedSkill : skill
        )
      );
      return updatedSkill;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    skills,
    loading,
    error,
    createSkill,
    updateSkillProgress,
    refreshSkills: fetchSkills
  };

  return (
    <SkillContext.Provider value={value}>
      {children}
    </SkillContext.Provider>
  );
};