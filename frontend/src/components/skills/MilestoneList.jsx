import React, { useState } from 'react';
import Button from '../common/Button';
import { api } from '../../services/api';

const MilestoneList = ({ milestones = [] }) => {
  const [completedMilestones, setCompletedMilestones] = useState(
    new Set(milestones.filter(m => m.completed).map(m => m._id))
  );

  const handleToggleMilestone = async (milestoneId) => {
    const isCompleting = !completedMilestones.has(milestoneId);
    
    try {
      // Optimistic update
      setCompletedMilestones(prev => {
        const next = new Set(prev);
        if (isCompleting) {
          next.add(milestoneId);
        } else {
          next.delete(milestoneId);
        }
        return next;
      });

      await api.skills.updateMilestone(milestoneId, { completed: isCompleting });
    } catch (error) {
      console.error('Failed to update milestone:', error);
      // Revert optimistic update on error
      setCompletedMilestones(prev => {
        const next = new Set(prev);
        if (isCompleting) {
          next.delete(milestoneId);
        } else {
          next.add(milestoneId);
        }
        return next;
      });
    }
  };

  if (!milestones.length) {
    return (
      <div className="bg-indigo-800/50 shadow-lg rounded-lg p-6 border border-indigo-700/50">
        <h3 className="text-xl font-semibold text-white mb-4">Milestones</h3>
        <p className="text-indigo-200 text-center py-4">No milestones available.</p>
      </div>
    );
  }

  return (
    <div className="bg-indigo-800/50 shadow-lg rounded-lg p-6 border border-indigo-700/50">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white">Milestones</h3>
          <p className="text-indigo-300 text-sm mt-1">Track your progress through key achievements</p>
        </div>
        <div className="text-indigo-200 text-sm">
          {completedMilestones.size}/{milestones.length} completed
        </div>
      </div>

      <div className="space-y-4">
        {milestones.map((milestone, index) => {
          const key = milestone._id || `milestone-${index}`;
          const isCompleted = completedMilestones.has(milestone._id);
          
          return (
            <div 
              key={key}
              className={`relative flex items-center justify-between p-4 rounded-lg border transition-all ${
                isCompleted 
                  ? 'bg-indigo-900/50 border-indigo-500/50' 
                  : 'bg-indigo-900/30 border-indigo-600/50 hover:border-indigo-500/50'
              }`}
            >
              {/* Progress indicator line */}
              {index < milestones.length - 1 && (
                <div className={`absolute left-7 bottom-0 w-0.5 h-4 -mb-4 z-0 ${
                  isCompleted ? 'bg-indigo-500/50' : 'bg-indigo-700/50'
                }`} />
              )}

              <div className="flex-1 mr-4">
                {/* Title and description */}
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-3 h-3 rounded-full ${
                    isCompleted ? 'bg-indigo-500' : 'bg-indigo-700'
                  }`} />
                  <h4 className={`font-medium ${
                    isCompleted ? 'text-white' : 'text-indigo-200'
                  }`}>
                    {milestone.title}
                  </h4>
                </div>
                <p className="text-sm text-indigo-300 ml-6">{milestone.description}</p>
                
                {/* Additional info */}
                <div className="flex items-center mt-2 text-sm text-indigo-400 ml-6">
                  <span className="mr-4">
                    <i className="far fa-clock mr-1" />
                    {milestone.estimatedHours} hours estimated
                  </span>
                  {milestone.learningResources?.length > 0 && (
                    <span>
                      <i className="far fa-book mr-1" />
                      {milestone.learningResources.length} resources available
                    </span>
                  )}
                </div>
              </div>

              <Button
                variant={isCompleted ? "secondary" : "primary"}
                size="small"
                onClick={() => handleToggleMilestone(milestone._id)}
              >
                {isCompleted ? 'Completed' : 'Mark Complete'}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MilestoneList;