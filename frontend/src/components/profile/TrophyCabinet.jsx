import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import Loading from '../common/Loading';

const TrophyCabinet = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const data = await api.profile.getAchievements();
      setAchievements(data);
    } catch (err) {
      setError('Failed to load achievements');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  // Trophy emoji mapping based on achievement type
  const trophyEmoji = {
    skill_complete: '🏆',
    milestone: '⭐',
    streak: '🔥',
    time_invested: '⏱️',
    special: '🌟'
  };

  return (
    <div className="bg-indigo-800/50 shadow-lg rounded-lg p-6 border border-indigo-700/50">
      <h2 className="text-2xl font-bold mb-4 text-white">Trophy Cabinet</h2>
      {achievements.length === 0 ? (
        <div className="bg-indigo-900/30 rounded-lg p-8 text-center">
          <p className="text-indigo-200">
            No achievements yet. Start completing skills and milestones to earn trophies!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {achievements.map((achievement) => (
            <div 
              key={achievement._id}
              className="flex flex-col items-center p-4 bg-indigo-900/30 rounded-lg border border-indigo-600/50 
                       hover:bg-indigo-900/50 transition-all hover:border-indigo-500/50"
            >
              <span className="text-3xl mb-2 transform transition-transform hover:scale-110">
                {trophyEmoji[achievement.type] || '🏆'}
              </span>
              <span className="text-sm font-medium text-white text-center">
                {achievement.title}
              </span>
              {achievement.description && (
                <span className="text-xs text-indigo-300 mt-1 text-center">
                  {achievement.description}
                </span>
              )}
              <span className="text-xs text-indigo-400 mt-2">
                {new Date(achievement.dateEarned).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}
      {error && (
        <div className="mt-4 bg-red-900/50 text-red-200 p-4 rounded-lg border border-red-700">
          {error}
        </div>
      )}
    </div>
  );
};

export default TrophyCabinet;