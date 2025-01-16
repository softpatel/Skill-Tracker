import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSkills } from '../../contexts/SkillContext';
import { api } from '../../services/api';
import Button from '../common/Button';
import Loading from '../common/Loading';

const SkillForm = () => {
  const navigate = useNavigate();
  const { createSkill } = useSkills();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    currentLevel: 'Beginner',
    targetLevel: 'Intermediate',
    timeCommitment: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const plan = await api.skills.generatePlan(formData);      
      const skillData = { ...formData, plan };
      const skill = await createSkill(skillData);
      navigate(`/skill/${skill._id}`);
    } catch (err) {
      setError(err.message || 'Failed to create skill');
    } finally {
      setLoading(false);
    }
  };

  // Common input styles
  const inputStyles = "mt-1 block w-full rounded-md bg-indigo-900/50 border border-indigo-500/50 text-white placeholder-indigo-400 hover:border-indigo-400/50 focus:ring-indigo-500 focus:border-indigo-500 transition-colors";
  const labelStyles = "block text-sm font-medium text-indigo-200";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-indigo-800/50 shadow-lg rounded-lg p-6 border border-indigo-700/50">
      <div className="space-y-4">
        <div>
          <label className={labelStyles}>
            Skill Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Python Programming, Digital Photography"
            className={inputStyles}
            required
          />
        </div>

        <div>
          <label className={labelStyles}>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="3"
            className={inputStyles}
            placeholder="What do you want to achieve with this skill?"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelStyles}>Current Level</label>
            <select
              value={formData.currentLevel}
              onChange={(e) => setFormData({ ...formData, currentLevel: e.target.value })}
              className={inputStyles}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className={labelStyles}>Target Level</label>
            <select
              value={formData.targetLevel}
              onChange={(e) => setFormData({ ...formData, targetLevel: e.target.value })}
              className={inputStyles}
            >
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelStyles}>
            Weekly Time Commitment (hours)
          </label>
          <input
            type="number"
            min="1"
            value={formData.timeCommitment}
            onChange={(e) => setFormData({ ...formData, timeCommitment: e.target.value })}
            className={inputStyles}
            required
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-900/50 text-red-200 p-4 rounded-lg border border-red-700">
          {error}
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <Button
          variant="outline"
          onClick={() => navigate('/dashboard')}
          type="button"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <Loading size="small" />
              <span>Creating Skill...</span>
            </div>
          ) : (
            'Create Skill'
          )}
        </Button>
      </div>
    </form>
  );
};

export default SkillForm;