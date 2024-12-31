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

  if (error) {
    return (
      <div className="bg-red-50 text-red-500 p-4 rounded-lg">
        {error}
      </div>
    );
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
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Trophy Cabinet</h2>
      {achievements.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No achievements yet. Start completing skills and milestones to earn trophies!
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {achievements.map((achievement) => (
            <div 
              key={achievement._id}
              className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <span className="text-3xl mb-2">
                {trophyEmoji[achievement.type] || '🏆'}
              </span>
              <span className="text-sm font-medium text-center">
                {achievement.title}
              </span>
              {achievement.description && (
                <span className="text-xs text-gray-500 mt-1 text-center">
                  {achievement.description}
                </span>
              )}
              <span className="text-xs text-gray-400 mt-2">
                {new Date(achievement.dateEarned).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrophyCabinet;