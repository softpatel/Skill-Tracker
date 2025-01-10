import React, { useState } from 'react';
import { useSkills } from '../../contexts/SkillContext';
import Button from '../common/Button';
import Input from '../common/Input';

const ProgressTracker = ({ skillId }) => {
  const { updateSkillProgress } = useSkills();
  const [isLogging, setIsLogging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progressData, setProgressData] = useState({
    duration: '',
    notes: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!progressData.duration) return;

    setLoading(true);
    try {
      await updateSkillProgress(skillId, {
        date: new Date().toISOString(),
        duration: parseFloat(progressData.duration),
        notes: progressData.notes
      });

      // Reset form
      setProgressData({ duration: '', notes: '' });
      setIsLogging(false);
    } catch (error) {
      console.error('Failed to log progress:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Track Your Progress</h3>
        {!isLogging && (
          <Button onClick={() => setIsLogging(true)}>
            Log Progress
          </Button>
        )}
      </div>

      {isLogging && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Time Spent (hours)"
            type="number"
            step="0.5"
            min="0"
            value={progressData.duration}
            onChange={(e) => setProgressData({ 
              ...progressData, 
              duration: e.target.value 
            })}
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (optional)
            </label>
            <textarea
              value={progressData.notes}
              onChange={(e) => setProgressData({ 
                ...progressData, 
                notes: e.target.value 
              })}
              rows="3"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="What did you work on? Any challenges or breakthroughs?"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => {
                setIsLogging(false);
                setProgressData({ duration: '', notes: '' });
              }}
              type="button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !progressData.duration}
            >
              {loading ? 'Saving...' : 'Save Progress'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProgressTracker;