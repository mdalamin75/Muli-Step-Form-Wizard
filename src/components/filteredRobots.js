import React, { useState } from 'react';
import RobotCard from './robotCard';
import RobotDetailModal from './robotDetailModal';

const FilteredRobots = ({ robots = [] }) => {
  const [visibleCount, setVisibleCount] = useState(3); // Initially show 3 robots
  const [selectedRobot, setSelectedRobot] = useState(null); // State for modal

  const showMoreRobots = () => {
    setVisibleCount((prevCount) => prevCount + 3); // Show 3 more robots each time
  };

  const hasMoreRobots = robots.length > visibleCount;

  const handleCardClick = (robot) => {
    setSelectedRobot(robot); // Set selected robot to show in modal
  };

  const closeModal = () => {
    setSelectedRobot(null); // Close modal
  };

  // Debugging to ensure robots are passed
  console.log('Filtered Robots in FilteredRobots:', robots);

  return (
    <div className="flex flex-col w-8/12 md:w-10/12 gap-5">
      {robots.length > 0 ? (
        robots.slice(0, visibleCount).map((robot) => (
          <RobotCard key={robot.id} robot={robot} onCardClick={handleCardClick} />
        ))
      ) : (
        <p className="no-results-message">No matching robots found.</p>
      )}
      {hasMoreRobots && (
        <button className="see-more-button max-w-40 bg-blue6 rounded-full px-10 py-3 font-abel font-normal text-lg text-slate-50 mx-auto mb-4 transition duration-200 delay-100 ease-in-out hover:bg-blue5" onClick={showMoreRobots}>
          See more...
        </button>
      )}
      {selectedRobot && <RobotDetailModal robot={selectedRobot} onClose={closeModal} />}
    </div>
  );
};

export default FilteredRobots;
