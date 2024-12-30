import React from 'react';
import SkillForm from '../components/skills/SkillForm';

const CreateSkill = () => {
  // TODO: Implement skill creation logic and AI plan generation
  const handleCreateSkill = async (skillData) => {
    console.log('Creating skill:', skillData);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Skill</h1>
      <SkillForm onSubmit={handleCreateSkill} />
    </div>
  );
};

export default CreateSkill;