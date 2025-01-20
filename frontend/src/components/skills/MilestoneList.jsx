import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, CheckCircle, Circle } from 'lucide-react';
import Button from '../common/Button';
import { api } from '../../services/api';

const MilestoneList = ({ milestones = [], onMilestoneUpdate }) => {
  const [expandedMilestones, setExpandedMilestones] = useState(new Set());
  const [loading, setLoading] = useState(null);

  const toggleMilestone = (id) => {
    setExpandedMilestones(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleToggleCompletion = async (milestone) => {
    try {
      setLoading(milestone._id);
      await api.skills.updateMilestone(milestone._id, {
        completed: !milestone.completed
      });
      if (onMilestoneUpdate) {
        onMilestoneUpdate(milestone._id, !milestone.completed);
      }
    } catch (error) {
      console.error('Failed to update milestone:', error);
    } finally {
      setLoading(null);
    }
  };

  if (!milestones.length) {
    return (
      <div className="bg-indigo-800/50 shadow-lg rounded-lg p-6 border border-indigo-700/50">
        <p className="text-indigo-200 text-center">No milestones available yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-indigo-800/50 shadow-lg rounded-lg border border-indigo-700/50">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Milestones</h3>
        <div className="space-y-4">
          {milestones.map((milestone) => (
            <div 
              key={milestone._id} 
              className="bg-indigo-900/30 rounded-lg border border-indigo-600/50"
            >
              <div className="px-4 py-3 flex items-center justify-between">
                <button
                  onClick={() => toggleMilestone(milestone._id)}
                  className="flex-1 flex items-center gap-3 text-left hover:bg-indigo-800/30 rounded-lg transition-colors pr-4"
                >
                  {milestone.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                  )}
                  <div className="min-w-0">
                    <h4 className="font-medium text-white truncate">{milestone.title}</h4>
                    <p className="text-sm text-indigo-300">
                      {milestone.estimatedHours} hours estimated
                      {milestone.learningResources?.length > 0 && 
                        ` • ${milestone.learningResources.length} resources available`}
                    </p>
                  </div>
                  {expandedMilestones.has(milestone._id) ? (
                    <ChevronUp className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                  )}
                </button>

                <div className="ml-4 flex-shrink-0">
                  <Button
                    variant={milestone.completed ? "secondary" : "primary"}
                    size="small"
                    onClick={() => handleToggleCompletion(milestone)}
                    disabled={loading === milestone._id}
                  >
                    {loading === milestone._id ? (
                      "Updating..."
                    ) : milestone.completed ? (
                      "Mark Incomplete"
                    ) : (
                      "Mark Complete"
                    )}
                  </Button>
                </div>
              </div>
              
              {expandedMilestones.has(milestone._id) && (
                <div className="px-4 pb-4">
                  <p className="text-indigo-200 mb-4">{milestone.description}</p>
                  
                  {milestone.learningResources?.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-indigo-300 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Learning Resources
                      </h5>
                      <ul className="space-y-2 pl-6">
                        {milestone.learningResources.map((resource, index) => (
                          <li key={index} className="text-indigo-200">
                            {resource.url ? (
                              <a 
                                href={resource.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-indigo-300 underline"
                              >
                                {resource.title}
                              </a>
                            ) : (
                              <span>{resource.title}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MilestoneList;