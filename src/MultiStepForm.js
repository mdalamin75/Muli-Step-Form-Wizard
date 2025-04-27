import React, { useState } from 'react';
import StepperForm from './components/stepperForm'; // New Component
import ResultsPage from './components/resultsPage'; // New Component
import mockRobots from './data/mockRobots';

const MultiStepForm = ({ robotTypes, applicationTypes, gripperTypes }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({
    step1: null,
    step2: null,
    step3: null,
  });
  const [dropdownSelected, setDropdownSelected] = useState(false);

  const handleOptionSelect = (step, option) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      [step]: prevOptions[step] === option ? null : option,
    }));
  };

  const handleDropdownSelect = (step, option) => {
    setSelectedOptions({ ...selectedOptions, [step]: option });
    setDropdownSelected(true);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const filteredRobots = searchTerm
    ? mockRobots.filter(robot => {
        const searchTokens = searchTerm.split(',').map(token => token.trim().toLowerCase());
        return searchTokens.every(token =>
          ['name', 'robotType', 'applicationType', 'gripperType'].some(field =>
            robot[field].toLowerCase().includes(token)
          )
        );
      })
    : selectedOptions.step1 || selectedOptions.step2 || selectedOptions.step3
    ? mockRobots.filter(robot => {
        return (
          (selectedOptions.step1 === null || robot.robotType === selectedOptions.step1) &&
          (selectedOptions.step2 === null || robot.applicationType === selectedOptions.step2) &&
          (selectedOptions.step3 === null || robot.gripperType === selectedOptions.step3)
        );
      })
    : [];

  const sortedRobots = [...filteredRobots].sort((a, b) => {
    switch (sortOption) {
      case 'Alphabetical':
        return a.name.localeCompare(b.name);
      case 'Type':
        return a.robotType.localeCompare(b.robotType);
      case 'Rating':
        const avgRatingA = a.ratingCount ? a.totalRating / a.ratingCount : 0;
        const avgRatingB = b.ratingCount ? b.totalRating / b.ratingCount : 0;
        return avgRatingB - avgRatingA;
      default:
        return 0;
    }
  });

  const currentOptions = currentStep === 1 ? robotTypes : currentStep === 2 ? applicationTypes : gripperTypes;
  const dropdownOptions = currentOptions.length > 3 ? currentOptions.slice(3) : [];

  return (
    <>
      {!isSubmitted ? (
        <StepperForm
          currentStep={currentStep}
          selectedOptions={selectedOptions}
          displayableOptions={currentOptions.slice(0, 3)}
          dropdownOptions={dropdownOptions}
          dropdownSelected={dropdownSelected}
          handleOptionSelect={handleOptionSelect}
          handleDropdownSelect={handleDropdownSelect}
          handleSubmit={handleSubmit}
          setCurrentStep={setCurrentStep}
        />
      ) : (
        <ResultsPage
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortOption={sortOption}
          setSortOption={setSortOption}
          robotTypes={robotTypes}
          applicationTypes={applicationTypes}
          gripperTypes={gripperTypes}
          selectedOptions={selectedOptions}
          handleOptionSelect={handleOptionSelect}
          sortedRobots={sortedRobots}
        />
      )}
    </>
  );
};

export default MultiStepForm;
