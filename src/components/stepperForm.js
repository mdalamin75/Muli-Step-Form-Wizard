import React, { useState } from 'react';
import Stepper from './stepper';
import Dropdown from './dropDown';
import NavigationButtons from './navigationButtons';
// import '../styles/stepperForm.css';

const StepperForm = ({ robots, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1); // Track the current step
  const [selectedOptions, setSelectedOptions] = useState({
    step1: null, // Robot type
    step2: null, // Application type
    step3: null, // Gripper type
  });

  // Dynamically compute unique options for each step
  const robotTypes = [...new Set(robots.map((robot) => robot.robotType))];
  const applicationTypes = [...new Set(robots.map((robot) => robot.applicationType))];
  const gripperTypes = [...new Set(robots.map((robot) => robot.gripperType))];

  // Determine the options to display based on the current step
  const currentOptions =
    currentStep === 1
      ? robotTypes
      : currentStep === 2
        ? applicationTypes
        : gripperTypes;

  const cardOptions = currentOptions.slice(0, 3); // Only show the first 3 options as cards
  const dropdownOptions = currentOptions.slice(3); // The rest go into the dropdown

  // Handle card selection for the current step
  const handleOptionSelect = (step, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [step]: prev[step] === option ? null : option, // Toggle selection
    }));
  };

  // Handle dropdown selection for the current step
  const handleDropdownSelect = (step, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [step]: option,
    }));
  };

  // Submit the selected filters and navigate to the results page
  const handleSubmit = () => {
    const filteredRobots = robots.filter((robot) => {
      return (
        (!selectedOptions.step1 || robot.robotType === selectedOptions.step1) &&
        (!selectedOptions.step2 || robot.applicationType === selectedOptions.step2) &&
        (!selectedOptions.step3 || robot.gripperType === selectedOptions.step3)
      );
    });

    onComplete(filteredRobots); // Pass the filtered robots to the parent
  };

  return (
    <div>
      {/* Stepper Progress Bar */}
      <Stepper steps={[1, 2, 3]} currentStep={currentStep} selectedOptions={selectedOptions} />

      {/* Selection Cards and Dropdown */}
      <div className="container mx-auto">
        {/* Top Button */}
        <div className="flex justify-end gap-5 pt-4">
          <button onClick={handleSubmit} className="border border-slate-400 px-4 py-2 rounded-md font-inter font-medium text-sm text-gray7 hover:text-blue5 hover:border-blue5">Exit</button>
          <button onClick={handleSubmit} className="border border-slate-400 px-4 py-2 rounded-md font-inter font-medium text-sm text-gray7 hover:text-blue5 hover:border-blue5">Skip</button>
        </div>
        <div className="step-card-container flex flex-row justify-center gap-16 w-full pt-28 pb-16">
          {cardOptions.map((option, index) => {
            const optionImage = `${process.env.PUBLIC_URL}/assets/${option}.png`;
            return (
              <div
                key={index}
                className={`step-card ${selectedOptions[`step${currentStep}`] === option ? 'selected' : ''} min-w-52 min-h-56 px-5 py-8 bg-gray border border-slate-300 rounded-md cursor-pointer transition delay-75 duration-200 ease-in-out hover:-translate-y-5 hover:bg-slate-50`}
                onClick={() => handleOptionSelect(`step${currentStep}`, option)}
              >
                <img src={optionImage} alt={option} />
                <p className="mt-3 text-center font-inter font-medium text-sm">text</p>
              </div>
            );
          })}
        </div>

        {/* Dropdown for Additional Options */}
        <div className="flex justify-center pt-5">
          {dropdownOptions.length > 0 && (
            <Dropdown
              options={dropdownOptions}
              onSelect={(option) => handleDropdownSelect(`step${currentStep}`, option)}
              selectedOption={selectedOptions[`step${currentStep}`]}
              placeholder="Can't find what you're looking for?"
              className="step-dropdown"
            />
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="container mx-auto">
        <NavigationButtons
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default StepperForm;
