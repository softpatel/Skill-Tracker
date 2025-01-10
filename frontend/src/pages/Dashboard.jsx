import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSkills } from '../contexts/SkillContext';
import SkillCard from '../components/dashboard/SkillCard';
import ProgressChart from '../components/dashboard/ProgressChart';
import Loading from '../components/common/Loading';
import Button from '../components/common/Button';

const Dashboard = () => {
  const { skills, loading, error, refreshSkills } = useSkills();

  useEffect(() => {
    refreshSkills();
  }, [refreshSkills]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loading size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={refreshSkills}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Skills Dashboard</h1>
        <Link to="/create-skill">
          <Button>Add New Skill</Button>
        </Link>
      </div>

      {skills.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Welcome to Skill Tracker!</h2>
          <p className="text-gray-600 mb-6">
            Start your learning journey by adding your first skill. Our AI will help create
            a personalized learning plan for you.
          </p>
          <Link to="/create-skill">
            <Button size="large">Get Started</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map(skill => (
              <SkillCard key={skill._id} skill={skill} />
            ))}
          </div>

          {/* Only show these if there are skills */}
          {skills.length > 0 && (
            <>
              <ProgressChart 
                timeEntries={skills.flatMap(skill => 
                  skill.timeEntries || []
                )}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;