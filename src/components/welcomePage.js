import React from 'react';
import UserIcon from './userIcon'; // Import UserIcon
import { GiWorld } from "react-icons/gi";

const WelcomePage = ({ user }) => {
  return (
    <div className="container mx-auto px-3 md:px-5">
      {/* Navigation Bar */}
      <div className="py-5 flex justify-end items-center gap-3">
        <GiWorld color="#3D4EAC" size="1.5rem" className="cursor-pointer" />
        <UserIcon user={user} /> {/* User Icon on the right */}
      </div>

      {/* Welcome Content */}
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1 className="text-3xl font-inter font-semibold mb-3">Welcome to the Robot Wizard</h1>
        <p className="font-abel font-medium text-lg">Explore our multi-step form and search for your ideal robots.</p>
      </div>
    </div>
  );
};

export default WelcomePage;
