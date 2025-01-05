import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSkills } from '../../contexts/SkillContext';
import { api } from '../../services/api';
import Button from '../common/Button';
import Input from '../common/Input';
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
      // Generate AI plan first
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow rounded-lg p-6">
      <div className="space-y-4">
        <Input
          label="Skill Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          placeholder="e.g., Python Programming, Digital Photography"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="What do you want to achieve with this skill?"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Level</label>
            <select
              value={formData.currentLevel}
              onChange={(e) => setFormData({ ...formData, currentLevel: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Target Level</label>
            <select
              value={formData.targetLevel}
              onChange={(e) => setFormData({ ...formData, targetLevel: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
        </div>

        <Input
          label="Weekly Time Commitment (hours)"
          type="number"
          min="1"
          value={formData.timeCommitment}
          onChange={(e) => setFormData({ ...formData, timeCommitment: e.target.value })}
          required
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <Button
          variant="secondary"
          onClick={() => navigate('/dashboard')}
          type="button"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? <Loading size="small" /> : 'Create Skill'}
        </Button>
      </div>
    </form>
  );
};

export default SkillForm;