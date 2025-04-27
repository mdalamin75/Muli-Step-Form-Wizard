import React, { useContext } from 'react';
import { UserContext } from '../contexts/userContext';
import mockRobots from '../data/mockRobots.json';

const Profile = () => {
  const { currentUser, logoutUser } = useContext(UserContext);

  if (!currentUser) {
    return <p>Please log in to view your profile.</p>;
  }

  const bookmarkedRobots = mockRobots.filter(robot =>
    currentUser.bookmarkedRobots.includes(robot.id)
  );

  return (
    <div className="container mx-auto h-dvh flex flex-col justify-center items-center">
      <h2 className="font-inter font-semibold text-lg">Welcome, {currentUser.username}!</h2>
      <p className="font-abel font-medium py-3">Bookmarked Robots:</p>
      <ul>
        {bookmarkedRobots.length > 0 ? (
          bookmarkedRobots.map(robot => <li key={robot.id}>{robot.name}</li>)
        ) : (
          <p className="font-abel font-normal py-3">No bookmarks yet.</p>
        )}
      </ul>
      <button onClick={logoutUser} className="bg-primary text-white font-abel font-medium text-base px-5 py-2 my-2 rounded-full">Logout</button>
    </div>
  );
};

export default Profile;
