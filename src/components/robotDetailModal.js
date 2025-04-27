import React, { useContext, useState, useEffect } from 'react';
import { FaBookmark, FaStar } from 'react-icons/fa'; // Import bookmark and star icons from react-icons
import { IoMdClose } from "react-icons/io";
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
    setIsBookmarked((prev) => !prev); // Update the local state to reflect the change
  };

  if (!robot) return null; // If no robot is selected, render nothing

  // Define paths for main and additional images using the public folder
  const robotImageSrc = `${process.env.PUBLIC_URL}/assets/${robot.image}`;
  const additionalImageSrc = `${process.env.PUBLIC_URL}/assets/${robot.additionalImage}`;

  // Calculate average rating by dividing total rating by rating count, with safeguards for missing values
  const averageRating = (robot.totalRating && robot.ratingCount) ? (robot.totalRating / robot.ratingCount).toFixed(1) : "No rating";

  return (
    <div className="RobotDetailModal-overlay fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex justify-center items-center z-50" onClick={onClose}> {/* Overlay to close modal on click */}
      <div className="container mx-auto px-3 md:px-5">
        <div className="RobotDetailModal-content bg-white p-3 md:p-10 rounded-lg relative w-full max-h-dvh overflow-y-scroll " onClick={(e) => e.stopPropagation()}> {/* Prevents modal close on inner click */}
          {/* Button container for close and bookmark buttons */}
          <div className="RobotDetailModal-buttons absolute top-3 right-3 flex gap-3">
            {/* Bookmark button with conditional color */}
            <button
              className={`RobotDetailModal-bookmark-button bg-blue5 text-slate-100 text-2xl p-1 cursor-pointer flex justify-center items-center rounded ${isBookmarked ? 'text-blue-600 bg-black' : 'text-zinc-400'
                }`}
              onClick={handleBookmarkClick}
            >
              <FaBookmark />
            </button>
            <button className="RobotDetailModal-close-button bg-blue5 text-slate-100 text-2xl p-1 cursor-pointer flex justify-center items-center rounded hover:bg-blue6" onClick={onClose}>
              <IoMdClose />
            </button> {/* Close button */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 mt-10 mb-10">
            <div>
              {/* Display robot details */}
              <h2 className="RobotDetailModal-title font-abel font-normal text-lg">{robot.name} - {robot.applicationType}</h2>
              {/* Display the rating section */}
              <div className="RobotDetailModal-rating flex items-center gap-2">
                <FaStar color="#F6C002" size="1.2rem" /> {/* Display star icon with yellow color */}
                <span className="RobotDetailModal-rating-text font-abel font-normal text-base">{averageRating}</span> {/* Display calculated average rating */}
              </div>
              <p className="font-abel font-normal text-base text-gray8"><strong>Robot Type:</strong> {robot.robotType}</p>
              <p className="font-abel font-normal text-base text-gray8"><strong>Application Type:</strong> {robot.applicationType}</p>
              <p className="font-abel font-normal text-base text-gray8"><strong>Gripper Type:</strong> {robot.gripperType}</p>
              <div className="flex justify-between items-center gap-5">
                <p className="font-abel font-normal text-base text-gray8"><strong>Data Available:</strong> {robot.dataAvailable || "Not specified"}</p>
                <p className="font-abel font-normal text-base text-gray8"><strong>Components:</strong> {robot.components || "Not specified"}</p>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="RobotDetailModal-images">
                {/* Display main image if available, else show placeholder text */}
                {robot.image ? (
                  <img src={robotImageSrc} alt={robot.name} />
                ) : (
                  <p>Image not available</p>
                )}
              </div>
            </div>
          </div>

          <div className="RobotDetailModal-details grid grid-cols-1 md:grid-cols-2  items-center gap-5">
            <div className="RobotDetailModal-program border border-slate-200 p-5 flex justify-end flex-col align-baseline">
              <h4 className="font-abel font-medium text-base">Program</h4>
              <p className="font-abel font-normal text-base text-gray8">{robot.program || "No program details available"}</p> {/* Program details or fallback */}
              <div className="">
                <div className="max-h-[20dvh] overflow-y-scroll">
                  <ul className="space-y-2">
                    <li className="font-abel font-medium text-base">Variables Setup</li>
                    <li>
                      <span className="font-abel font-medium text-base">Robot Program</span>
                      <ul className="pl-4 space-y-1 font-abel font-normal text-base text-gray8">
                        <li>MoveJ - home</li>
                        <li>3FG Release(100)*</li>
                        <li>Call PickObject</li>
                        <li>Call OpenDoor</li>
                        <li>Call LoadPiece</li>
                        <li>Call CloseDoor</li>
                        <li>Popup: Machineries finished</li>
                        <li>Call OpenDoor</li>
                        <li>Call UnloadPiece</li>
                        <li>Call CloseDoor</li>
                      </ul>
                    </li>
                    <li>
                      <span className="font-abel font-medium text-base">PickObject</span>
                      <ul className="pl-4 space-y-1 font-abel font-normal text-base text-gray8">
                        <li>MoveJ - pick1</li>
                        <li>MoveL - pick2</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="RobotDetailModal-images flex justify-center md:justify-end">
              {/* Display additional image if available, else show placeholder text */}
              {robot.additionalImage ? (
                <img src={additionalImageSrc} alt={`${robot.name} setup`} />
              ) : (
                <p>Additional image not available</p>
              )}
            </div>
          </div>
          <button className="RobotDetailModal-download-button bg-slate-300 px-6 py-2 rounded-full font-abel font-normal text-lg text-slate-900 mt-5 transition ease-in-out duration-200 delay-100 hover:bg-blue6 hover:text-white">Download</button> {/* Download button */}
        </div>
      </div>
    </div>
  );
};

export default RobotDetailModal;
