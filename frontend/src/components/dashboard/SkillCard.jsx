import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSkills } from '../../contexts/SkillContext';
import Button from '../common/Button';

const SkillCard = ({ skill }) => {
  const { deleteSkill } = useSkills();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteSkill(skill._id);
      setShowConfirmation(false);
    } catch (error) {
      console.error('Failed to delete skill:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!skill) {
    return (
      <div className="bg-indigo-800/50 shadow-lg rounded-lg p-6 min-h-[200px] animate-pulse">
        <div className="h-6 bg-indigo-700 rounded w-3/4 mb-4"></div>
        <div className="space-y-4">
          <div className="h-2 bg-indigo-700 rounded"></div>
          <div className="flex justify-between">
            <div className="h-4 bg-indigo-700 rounded w-1/3"></div>
            <div className="h-4 bg-indigo-700 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-indigo-800/50 shadow-lg rounded-lg p-6 hover:bg-indigo-800/70 transition-all relative border border-indigo-700/50">
      {/* Delete button */}
      <button
        onClick={() => setShowConfirmation(true)}
        className="absolute top-4 right-4 text-indigo-300 hover:text-red-400 transition-colors"
        disabled={isDeleting}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-indigo-950/80 flex items-center justify-center z-50">
          <div className="bg-indigo-900 rounded-lg p-6 max-w-sm mx-4 border border-indigo-700">
            <h3 className="text-lg font-medium mb-4 text-white">Delete Skill</h3>
            <p className="text-indigo-200 mb-6">
              Are you sure you want to delete "{skill.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmation(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-500"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 text-white">{skill.title}</h3>
        <p className="text-indigo-200 text-sm line-clamp-2">{skill.description}</p>
      </div>

      <div className="space-y-4">
        <div className="relative h-2 bg-indigo-700/50 rounded">
          <div 
            className="absolute top-0 left-0 h-full bg-indigo-500 rounded transition-all duration-500" 
            style={{ width: `${skill.progressPercentage || 0}%` }}
          />
        </div>

        <div className="flex justify-between text-sm">
          <div className="text-indigo-200">
            <span className="font-medium text-white">{skill.timeSpent || 0}</span> hours invested
          </div>
          <div className="text-indigo-200">
            <span className="font-medium text-white">{skill.progressPercentage || 0}%</span> complete
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-indigo-300">
            {skill.currentLevel} → {skill.targetLevel}
          </div>
          <Link 
            to={`/skill/${skill._id}`}
            className="text-indigo-300 hover:text-indigo-200 text-sm font-medium flex items-center gap-1 group"
          >
            View Details 
            <span className="transform transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;