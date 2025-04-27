import React, { useContext, useState, useEffect } from 'react';
import '../styles/robotDetailModal.css';
import { FaBookmark, FaStar } from 'react-icons/fa'; // Import bookmark and star icons from react-icons
import { UserContext } from '../contexts/userContext'; // Import UserContext to access current user

// Component to display detailed robot information in a modal
const RobotDetailModal = ({ robot, onClose }) => {
  const { currentUser, toggleBookmark } = useContext(UserContext); // Access current user and bookmark function from context
  const [isBookmarked, setIsBookmarked] = useState(false); // State to track if the robot is bookmarked

  useEffect(() => {
    // Check if the robot ID is in the user's bookmarkedRobots array
    if (currentUser) {
      setIsBookmarked(currentUser.bookmarkedRobots.includes(robot.id));
    }
  }, [currentUser, robot.id]);

  const handleBookmarkClick = () => {
    toggleBookmark(robot.id); // Toggle bookmark in the context
    setIsBookmarked(!isBookmarked); // Update the local state to reflect the change
  };

  if (!robot) return null; // If no robot is selected, render nothing

  // Define paths for main and additional images using the public folder
  const robotImageSrc = `${process.env.PUBLIC_URL}/assets/${robot.image}`;
  const additionalImageSrc = `${process.env.PUBLIC_URL}/assets/${robot.additionalImage}`;

  // Calculate average rating by dividing total rating by rating count, with safeguards for missing values
  const averageRating = (robot.totalRating && robot.ratingCount) ? (robot.totalRating / robot.ratingCount).toFixed(1) : "No rating";

  return (
    <div className="RobotDetailModal-overlay" onClick={onClose}> {/* Overlay to close modal on click */}
      <div className="RobotDetailModal-content" onClick={(e) => e.stopPropagation()}> {/* Prevents modal close on inner click */}
        
        {/* Button container for close and bookmark buttons */}
        <div className="RobotDetailModal-buttons">
          {/* Bookmark button with conditional color */}
          <button className="RobotDetailModal-bookmark-button" onClick={handleBookmarkClick} style={{ color: isBookmarked ? 'blue' : 'gray' }}>
            <FaBookmark />
          </button>
          <button className="RobotDetailModal-close-button" onClick={onClose}>×</button> {/* Close button */}
        </div>

        {/* Display robot details */}
        <h2 className="RobotDetailModal-title">{robot.name} - {robot.applicationType}</h2>
        {/* Display the rating section */}
        <div className="RobotDetailModal-rating">
          <FaStar color="#ff0" size="1em" /> {/* Display star icon with yellow color */}
          <span className="RobotDetailModal-rating-text">{averageRating}</span> {/* Display calculated average rating */}
        </div>
        <p><strong>Robot Type:</strong> {robot.robotType}</p>
        <p><strong>Application Type:</strong> {robot.applicationType}</p>
        <p><strong>Gripper Type:</strong> {robot.gripperType}</p>
        <p><strong>Data Available:</strong> {robot.dataAvailable || "Not specified"}</p>
        <p><strong>Components:</strong> {robot.components || "Not specified"}</p>

        <div className="RobotDetailModal-details">
          <div className="RobotDetailModal-program">
            <h4>Program</h4>
            <p>{robot.program || "No program details available"}</p> {/* Program details or fallback */}
          </div>
          <div className="RobotDetailModal-images">
            {/* Display main image if available, else show placeholder text */}
            {robot.image ? (
              <img src={robotImageSrc} alt={robot.name} />
            ) : (
              <p>Image not available</p>
            )}
            {/* Display additional image if available, else show placeholder text */}
            {robot.additionalImage ? (
              <img src={additionalImageSrc} alt={`${robot.name} setup`}/>
            ) : (
              <p>Additional image not available</p>
            )}
          </div>
        </div>
        <button className="RobotDetailModal-download-button">Download</button> {/* Download button */}
      </div>
    </div>
  );
};

export default RobotDetailModal;
