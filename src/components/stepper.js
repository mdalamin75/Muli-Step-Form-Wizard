import React from 'react';
import Step from './step';
import '../styles/stepper.css';

const Stepper = ({ steps, currentStep, selectedOptions }) => {
  return (
    <div className="bg-gray w-full">
      <div className="container mx-auto">
        <div className="stepper flex justify-center py-16">
          {steps.map((step, index) => {
            const isFirst = index === 0;
            const isLast = index === steps.length - 1;
            const isCurrent = currentStep === index + 1;
            const isPost = currentStep > index + 1;
            const isPre = currentStep < index + 1;

            return (
              <Step
                key={index}
                isFirst={isFirst}
                isLast={isLast}
                isCurrent={isCurrent}
                isPre={isPre}
                isPost={isPost}
                title={`Step ${index + 1}`}
                subtitle={selectedOptions[`step${index + 1}`] || step.subtitle}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
