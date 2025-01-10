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
    return <Loading />;
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Skill not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2">{skill.title}</h1>
        <p className="text-gray-600 mb-4">{skill.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Current Level</h3>
            <p className="mt-1 text-lg">{skill.currentLevel}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Target Level</h3>
            <p className="mt-1 text-lg">{skill.targetLevel}</p>
          </div>
        </div>

        <div className="h-2 bg-gray-200 rounded mb-4">
          <div 
            className="h-full bg-blue-500 rounded" 
            style={{ width: `${skill.progress || 0}%` }}
          />
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>{skill.timeSpent || 0} hours invested</span>
          <span>{skill.progress || 0}% complete</span>
        </div>
      </div>

      <ProgressTracker skillId={skillId} />
      {skill.milestones && <MilestoneList milestones={skill.milestones} />}
    </div>
  );
};

export default SkillDetail;