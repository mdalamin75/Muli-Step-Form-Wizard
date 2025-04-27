import React from 'react';
import UserIcon from './userIcon'; // Import UserIcon

const WelcomePage = ({ user }) => {
  return (
    <div className="">
      {/* Navigation Bar */}
      <div >
        <UserIcon user={user} /> {/* User Icon on the right */}
      </div>

      {/* Welcome Content */}
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1 className="text-3xl">Welcome to the Robot Wizard</h1>
        <p>Explore our multi-step form and search for your ideal robots.</p>
      </div>
    </div>
  );
};

export default WelcomePage;
