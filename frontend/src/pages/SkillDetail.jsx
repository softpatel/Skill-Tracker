import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import ProgressTracker from '../components/skills/ProgressTracker';
import MilestoneList from '../components/skills/MilestoneList';
import Loading from '../components/common/Loading';

const SkillDetail = () => {
  const { skillId } = useParams();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkillDetails = async () => {
      try {
        const skillData = await api.skills.getById(skillId);
        setSkill(skillData);
      } catch (err) {
        setError(err.message || 'Failed to load skill details');
      } finally {
        setLoading(false);
      }
    };

    fetchSkillDetails();
  }, [skillId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/50 text-red-200 p-4 rounded-lg border border-red-700">
        {error}
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="text-center py-8">
        <p className="text-indigo-200">Skill not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-indigo-800/50 shadow-lg rounded-lg p-6 border border-indigo-700/50">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{skill.title}</h1>
            <p className="text-indigo-200 mb-4">{skill.description}</p>
          </div>
          <div className="bg-indigo-900/50 px-4 py-2 rounded-lg border border-indigo-600/50">
            <span className="text-indigo-200 text-sm">Status</span>
            <div className="text-white font-semibold mt-1">
              {skill.status === 'completed' ? 'Completed' : 'In Progress'}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-indigo-900/30 p-4 rounded-lg border border-indigo-600/50">
            <h3 className="text-sm font-medium text-indigo-300 mb-1">Current Level</h3>
            <p className="text-lg text-white capitalize">{skill.currentLevel}</p>
          </div>
          <div className="bg-indigo-900/30 p-4 rounded-lg border border-indigo-600/50">
            <h3 className="text-sm font-medium text-indigo-300 mb-1">Target Level</h3>
            <p className="text-lg text-white capitalize">{skill.targetLevel}</p>
          </div>
          <div className="bg-indigo-900/30 p-4 rounded-lg border border-indigo-600/50">
            <h3 className="text-sm font-medium text-indigo-300 mb-1">Time Commitment</h3>
            <p className="text-lg text-white">{skill.timeCommitment} hrs/week</p>
          </div>
        </div>

        <div className="bg-indigo-900/30 rounded-lg p-4 border border-indigo-600/50">
          <div className="mb-2">
            <div className="flex justify-between text-sm text-indigo-200 mb-1">
              <span>Progress</span>
              <span>{skill.progress || 0}% Complete</span>
            </div>
            <div className="h-2 bg-indigo-950 rounded overflow-hidden">
              <div 
                className="h-full bg-indigo-500 rounded transition-all duration-500" 
                style={{ width: `${skill.progress || 0}%` }}
              />
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-indigo-200">
              <span className="text-white font-medium">{skill.timeSpent || 0}</span> hours invested
            </span>
            <span className="text-indigo-200">
              Started {new Date(skill.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <ProgressTracker skillId={skillId} />
      {skill.milestones && <MilestoneList milestones={skill.milestones} />}
    </div>
  );
};

export default SkillDetail;