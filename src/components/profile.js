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
    <div>
      <h2>Welcome, {currentUser.username}!</h2>
      <p>Bookmarked Robots:</p>
      <ul>
        {bookmarkedRobots.length > 0 ? (
          bookmarkedRobots.map(robot => <li key={robot.id}>{robot.name}</li>)
        ) : (
          <p>No bookmarks yet.</p>
        )}
      </ul>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};

export default Profile;
