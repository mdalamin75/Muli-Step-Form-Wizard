import React, { useState, useEffect } from 'react';
import SearchBar from './searchBar';
import FilterDropdown from './filterDropdown';
import Sidebar from './sideBar';
import FilteredRobots from './filteredRobots';
import '../styles/resultsPage.css';

const ResultsPage = ({
  robots = [], // Default robots to an empty array
  robotTypes = [], // Default robotTypes to an empty array
  applicationTypes = [], // Default applicationTypes to an empty array
  gripperTypes = [], // Default gripperTypes to an empty array
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({
    step1: null, // For Robot Type
    step2: null, // For Application Type
    step3: null, // For Gripper Type
  });

  // Filter robots based on search term and filters
  const filteredRobots = robots.filter((robot) => {
    const matchesSearchTerm =
      !searchTerm ||
      ['name', 'robotType', 'applicationType', 'gripperType'].some((field) =>
        robot[field]?.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesFilters =
      (!selectedOptions.step1 || robot.robotType === selectedOptions.step1) &&
      (!selectedOptions.step2 || robot.applicationType === selectedOptions.step2) &&
      (!selectedOptions.step3 || robot.gripperType === selectedOptions.step3);

    return matchesSearchTerm && matchesFilters;
  });

  // Sort filtered robots
  const sortedRobots = [...filteredRobots].sort((a, b) => {
    switch (sortOption) {
      case 'Alphabetical':
        return a.name.localeCompare(b.name);
      case 'Type':
        return a.robotType.localeCompare(b.robotType);
      default:
        return 0; // No sorting applied
    }
  });

  // Handle sidebar option selection
  const handleOptionSelect = (step, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [step]: prev[step] === option ? null : option, // Toggle selection
    }));
  };

  // Debugging: Log filtered robots and selected options
  useEffect(() => {
    console.log('Filtered Robots in ResultsPage:', filteredRobots);
    console.log('Selected Options:', selectedOptions);
  }, [filteredRobots, selectedOptions]);

  return (
    <>
      <div className="results-page">
        {/* Search Bar and Sorting Dropdown */}
        <div className="bg-gray py-16">
          <div className="container mx-auto">
            <div className="w-full flex justify-center align-middle items-center gap-5">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <FilterDropdown selectedOption={sortOption} setSelectedOption={setSortOption} />
            </div>
          </div>
        </div>

        {/* Sidebar and Filtered Robots */}
        <div className="flex gap-10 py-12">
          <Sidebar
            robotTypes={robotTypes}
            applicationTypes={applicationTypes}
            gripperTypes={gripperTypes}
            selectedOptions={selectedOptions}
            onSelect={handleOptionSelect} // Pass handler to Sidebar
          />
          {sortedRobots.length > 0 ? (
            <FilteredRobots robots={sortedRobots} />
          ) : (
            <p>No robots match the selected criteria.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ResultsPage;
