import React from 'react';
// import '../styles/navigationButtons.css';

const NavigationButtons = ({ 
  currentStep, 
  setCurrentStep, 
  handleSubmit 
}) => {
  return (
    <div className="flex justify-end gap-5 pt-10 mb-5">
      {/* <button onClick={handleSubmit}>Skip</button> */}
      {currentStep > 1 && (
        <button className="previous-button border border-slate-400 px-6 py-2 rounded-md font-inter font-medium text-sm text-gray7 hover:text-blue5 hover:border-blue5" onClick={() => setCurrentStep(currentStep - 1)}>
          Previous
        </button>
      )}
      {currentStep < 3 && (
        <button onClick={() => setCurrentStep(currentStep + 1)} className="bg-blue5 font-inter font-medium text-sm text-white px-6 py-2 transition-all rounded-md hover:bg-blue6">
          Next
        </button>
      )}
      {currentStep === 3 && (
        <button onClick={handleSubmit} className="bg-blue5 font-inter font-medium text-sm text-white px-6 py-2 transition-all rounded-md hover:bg-blue6">
          Submit
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
