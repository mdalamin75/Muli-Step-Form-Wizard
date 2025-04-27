import React from 'react';
import Step from './step';
import UserIcon from './userIcon';
import { GiWorld } from "react-icons/gi";
const Stepper = ({ steps, currentStep, selectedOptions, user }) => {
  return (
    <div className="bg-gray w-full">
      <div className="container mx-auto px-3 md:px-5">
        <div className="user flex items-center justify-end gap-3 py-5">
          <GiWorld color="#3D4EAC" size="1.5rem" className="cursor-pointer" />
          <UserIcon user={user} />
        </div>
        <div className="stepper grid sm:grid-flow-row md:grid-flow-col justify-center gap-3 py-16">
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
