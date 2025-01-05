import React from 'react';
import SkillForm from '../components/skills/SkillForm';

const CreateSkill = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Skill</h1>
      <p className="text-gray-600 mb-8">
        Fill in the details below to create a new skill and get an AI-generated learning plan.
      </p>
      <SkillForm />
    </div>
  );
};

export default CreateSkill;