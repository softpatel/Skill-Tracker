import React, { createContext, useContext, useState, useReducer } from 'react';

const SkillContext = createContext();

export const useSkills = () => {
  const context = useContext(SkillContext);
  if (!context) {
    throw new Error('useSkills must be used within a SkillProvider');
  }
  return context;
};

// Define action types
const ACTIONS = {
  SET_SKILLS: 'SET_SKILLS',
  ADD_SKILL: 'ADD_SKILL',
  UPDATE_SKILL: 'UPDATE_SKILL',
  DELETE_SKILL: 'DELETE_SKILL',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR'
};

const skillReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_SKILLS:
      return { ...state, skills: action.payload, loading: false };
    case ACTIONS.ADD_SKILL:
      return { ...state, skills: [...state.skills, action.payload] };
    case ACTIONS.UPDATE_SKILL:
      return {
        ...state,
        skills: state.skills.map(skill =>
          skill.id === action.payload.id ? action.payload : skill
        )
      };
    case ACTIONS.DELETE_SKILL:
      return {
        ...state,
        skills: state.skills.filter(skill => skill.id !== action.payload)
      };
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const SkillProvider = ({ children }) => {
  const [state, dispatch] = useReducer(skillReducer, {
    skills: [],
    loading: false,
    error: null
  });

  const createSkill = async (skillData) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      // TODO: Implement API call to create skill
      // const response = await api.createSkill(skillData);
      // dispatch({ type: ACTIONS.ADD_SKILL, payload: response.data });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  const updateSkillProgress = async (skillId, progressData) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      // TODO: Implement API call to update progress
      // const response = await api.updateSkillProgress(skillId, progressData);
      // dispatch({ type: ACTIONS.UPDATE_SKILL, payload: response.data });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  const value = {
    skills: state.skills,
    loading: state.loading,
    error: state.error,
    createSkill,
    updateSkillProgress
  };

  return <SkillContext.Provider value={value}>{children}</SkillContext.Provider>;
};