import React from 'react';
import SkillCard from '../components/dashboard/SkillCard';
import ProgressChart from '../components/dashboard/ProgressChart';
import MilestoneList from '../components/dashboard/MilestoneList';

const Dashboard = () => {
  // TODO: Fetch user's skills and progress data
  const mockSkills = []; // Will be replaced with real data

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your Skills Dashboard</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSkills.map(skill => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
      <ProgressChart />
      <MilestoneList />
    </div>
  );
};

export default Dashboard;