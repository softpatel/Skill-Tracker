import React from 'react';
import SkillForm from '../components/skills/SkillForm';

const CreateSkill = () => {
  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-3">Create New Skill</h1>
        <p className="text-indigo-200">
          Fill in the details below to create a new skill and get an AI-generated learning plan. 
          Our AI will analyze your goals and create a personalized roadmap for success.
        </p>
      </div>

      <div className="relative">
        {/* Optional decorative element */}
        <div className="absolute -top-4 -left-4 w-32 h-32 bg-indigo-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-indigo-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        
        {/* Form */}
        <div className="relative">
          <SkillForm />
        </div>
      </div>

      {/* Optional help text */}
      <div className="mt-8 bg-indigo-900/30 rounded-lg p-4 border border-indigo-700/50">
        <h3 className="text-lg font-semibold text-white mb-2">Tips for Better Results</h3>
        <ul className="list-disc list-inside space-y-2 text-indigo-200">
          <li>Be specific about what you want to learn</li>
          <li>Set realistic time commitments you can maintain</li>
          <li>Choose appropriate skill levels to ensure steady progress</li>
          <li>Add details about your learning style in the description</li>
        </ul>
      </div>
    </div>
  );
};

export default CreateSkill;