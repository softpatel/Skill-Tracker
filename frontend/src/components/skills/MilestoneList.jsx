import React, { useState } from 'react';
import Button from '../common/Button';
import { api } from '../../services/api';

const MilestoneList = ({ milestones = [] }) => {
  const [completedMilestones, setCompletedMilestones] = useState(
    new Set(milestones.filter(m => m.completed).map(m => m._id))
  );

  const handleToggleMilestone = async (milestoneId) => {
    try {
      const isCompleting = !completedMilestones.has(milestoneId);
      
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
        if (!isCompleting) {
          next.add(milestoneId);
        } else {
          next.delete(milestoneId);
        }
        return next;
      });
    }
  };

  if (!milestones || milestones.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Milestones</h3>
        <p className="text-gray-500 text-center py-4">
          No milestones have been created for this skill yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Milestones</h3>
      <div className="space-y-4">
        {milestones.map((milestone) => (
          <div 
            key={milestone._id}
            className={`flex items-center justify-between p-4 border rounded transition-colors ${
              completedMilestones.has(milestone._id) 
                ? 'bg-green-50 border-green-200' 
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex-1 mr-4">
              <h4 className="font-medium">{milestone.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
              {milestone.estimatedHours && (
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <span className="mr-4">
                    {milestone.estimatedHours} hours estimated
                  </span>
                </div>
              )}
              {milestone.learningResources?.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-600">Resources:</p>
                  <ul className="list-disc list-inside text-sm text-gray-500">
                    {milestone.learningResources.map((resource, index) => (
                      <li key={index}>
                        {resource.url ? (
                          <a 
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {resource.title}
                          </a>
                        ) : (
                          resource.title
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <Button
              variant={completedMilestones.has(milestone._id) ? "secondary" : "primary"}
              size="small"
              onClick={() => handleToggleMilestone(milestone._id)}
            >
              {completedMilestones.has(milestone._id) ? 'Completed' : 'Mark Complete'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MilestoneList;