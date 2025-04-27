import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Load the user from localStorage on mount (or mock data)
  useEffect(() => {
    // Mock user loading from localStorage
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  const toggleBookmark = (robotId) => {
    if (!currentUser) return;

    // Determine if the robot is currently bookmarked
    const isBookmarked = currentUser.bookmarkedRobots.includes(robotId);
    const updatedBookmarks = isBookmarked
      ? currentUser.bookmarkedRobots.filter(id => id !== robotId) // Remove bookmark
      : [...currentUser.bookmarkedRobots, robotId]; // Add bookmark

    // Update currentUser and store in localStorage
    const updatedUser = { ...currentUser, bookmarkedRobots: updatedBookmarks };
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    // Uncomment the code below when ready to use the REST API
    /*
    fetch('/api/bookmark', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: currentUser.id,
        robotId: robotId,
        action: isBookmarked ? 'remove' : 'add'
      })
    })
    .then(response => response.json())
    .then(updatedUserData => {
      setCurrentUser(updatedUserData);
    })
    .catch(error => console.error("Error updating bookmark:", error));
    */
  };

  const loginUser = (user) => {
    console.log('Logging in user:', user);
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <UserContext.Provider value={{ currentUser, toggleBookmark, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};