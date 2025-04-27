import React from 'react';
import { FaStar } from 'react-icons/fa'; // Import the star icon from react-icons

// Function to dynamically load the robot image
const getImage = imageName => {
  try {
    // Attempt to load the image from assets
    return require(`../assets/${imageName}`);
  } catch (err) {
    // Log a warning if the image is not found
    console.warn(`Image ${imageName} not found`);
    return null; // Return null if image doesn't exist
  }
};

// RobotCard component to display each robot's details
const RobotCard = ({ robot, onCardClick }) => {
  // Calculate average rating by dividing total rating by rating count, with safeguards for missing values
  const averageRating = (robot.totalRating && robot.ratingCount) ? (robot.totalRating / robot.ratingCount).toFixed(1) : "No rating";
  const imageSrc = getImage(robot.image); // Fetch image from assets

  return (
    <div className="py-5 px-3 md:px-8 rounded-xl shadow-xl mr-3 md:mr-10 border border-slate-300 transition duration-200 delay-100 hover:-translate-y-2" onClick={() => onCardClick(robot)}>
      {/* Image and details container */}
      <div className="robot-card-content grid sm:grid-flow-row md:grid-flow-col justify-between items-center gap-5">
        <div className="robot-card-box-left sm:order-2 md:order-1">
          <div className="robot-details">
            <h3 className="font-abel font-normal text-lg text-gray8">{robot.name}</h3>
            <div className="robot-rating flex items-center gap-2">
              <FaStar color="#F6C002" size="1.2rem" /> {/* Display star icon with yellow color */}
              <span className="rating-text font-abel font-normal text-base">{averageRating}</span> {/* Display calculated average rating */}
            </div>
            <div className="robot-details">
              <p className="font-abel font-normal text-sm md:text-base text-gray8"><strong>Robot Type:</strong> {robot.robotType}</p>
              <p className="font-abel font-normal text-sm md:text-base text-gray8"><strong>Application Type:</strong> {robot.applicationType}</p>
              <p className="font-abel font-normal text-sm md:text-base text-gray8"><strong>Gripper Type:</strong> {robot.gripperType}</p>
              <p className="font-abel font-normal text-sm md:text-base text-gray8"><strong>Data Available:</strong> {robot.dataAvailable || "Not specified"}</p>
            </div>
          </div>
        </div>
        <div className="robot-card-box-right sm:order-1 md:order-2">
          <div className="">
            {imageSrc ? (
              <img src={imageSrc} alt={`${robot.name}`} />
            ) : (
              <div className="image-placeholder">Image not available</div> // Show placeholder if no image
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RobotCard;
