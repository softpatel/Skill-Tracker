import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import Loading from '../common/Loading';
import { motion, AnimatePresence } from 'framer-motion';

const TrophyCabinet = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  const categories = {
    all: 'All Achievements',
    skill_milestone: 'Skill Milestones',
    time_invested: 'Time Invested',
    streak: 'Streaks',
    milestone: 'Milestones'
  };

  const filteredAchievements = achievements.filter(achievement => 
    selectedCategory === 'all' || achievement.type === selectedCategory
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-indigo-800/50 shadow-lg rounded-lg p-6 border border-indigo-700/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Trophy Cabinet</h2>
        <div className="flex space-x-2">
          {Object.entries(categories).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                selectedCategory === key
                  ? 'bg-indigo-600 text-white'
                  : 'bg-indigo-900/50 text-indigo-300 hover:bg-indigo-800/50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {achievements.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-indigo-900/30 rounded-lg p-8 text-center"
        >
          <p className="text-indigo-200">
            No achievements yet. Start completing skills and milestones to earn trophies!
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="sync">
            {filteredAchievements.map((achievement) => (
              <motion.div
                key={achievement._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.02 }}
                className="flex flex-col items-center p-4 bg-indigo-900/30 rounded-lg border border-indigo-600/50 
                         hover:bg-indigo-900/50 transition-colors hover:border-indigo-500/50"
              >
                <motion.div 
                  className="text-3xl mb-2 select-none"
                  whileHover={{ rotate: [0, -10, 10, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {achievement.emoji || '🏆'} {/* Fallback emoji if none is set */}
                </motion.div>
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
              </motion.div>
            ))}
          </AnimatePresence>
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