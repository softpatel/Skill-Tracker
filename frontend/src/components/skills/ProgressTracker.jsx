import React, { useState } from 'react';
import { useSkills } from '../../contexts/SkillContext';
import Button from '../common/Button';

const ProgressTracker = ({ skillId, onProgressUpdate }) => {
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
      const duration = parseFloat(progressData.duration);
      
      if (isNaN(duration) || duration <= 0) {
        throw new Error('Please enter a valid duration');
      }

      // Get the updated skill data from the API
      const updatedSkill = await updateSkillProgress(skillId, {
        date: new Date().toISOString(),
        duration: duration,
        notes: progressData.notes || ''
      });

      // Call the onProgressUpdate callback with the updated skill data
      if (onProgressUpdate) {
        onProgressUpdate(updatedSkill);
      }

      setProgressData({ duration: '', notes: '' });
      setIsLogging(false);
    } catch (error) {
      console.error('Failed to log progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = "mt-1 block w-full rounded-md bg-indigo-900/50 border border-indigo-500/50 text-white placeholder-indigo-400 hover:border-indigo-400/50 focus:ring-indigo-500 focus:border-indigo-500 transition-colors";

  return (
    <div className="bg-indigo-800/50 shadow-lg rounded-lg p-6 border border-indigo-700/50">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white">Track Your Progress</h3>
          <p className="text-indigo-300 text-sm mt-1">Log your practice time and reflections</p>
        </div>
        {!isLogging && (
          <Button onClick={() => setIsLogging(true)}>
            Log Progress
          </Button>
        )}
      </div>

      {isLogging && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-indigo-200 mb-1">
              Time Spent (hours)
            </label>
            <input
              type="number"
              step="0.5"
              min="0"
              value={progressData.duration}
              onChange={(e) => setProgressData({ 
                ...progressData, 
                duration: e.target.value 
              })}
              className={inputStyles}
              required
              placeholder="Enter time in hours"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-indigo-200 mb-1">
              Notes (optional)
            </label>
            <textarea
              value={progressData.notes}
              onChange={(e) => setProgressData({ 
                ...progressData, 
                notes: e.target.value 
              })}
              rows="3"
              className={inputStyles}
              placeholder="What did you work on? Any challenges or breakthroughs?"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
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