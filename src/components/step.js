import React from 'react';

const Step = ({ isFirst, isLast, isCurrent, isPre, isPost, title, subtitle }) => {
  let stepClass = 'step';

  // Apply background classes based on step state
  if (isFirst) {
    stepClass += isCurrent ? ' step-first-active' : ' step-first-post';
  } else if (isLast) {
    stepClass += isCurrent ? ' step-last-active' : ' step-last-pre';
  } else {
    if (isCurrent) stepClass += ' step-mid-active';
    else if (isPre) stepClass += ' step-mid-pre';
    else if (isPost) stepClass += ' step-mid-post';
  }

  return (
    <>
    <div className={`${stepClass} w-60 h-16 flex flex-col justify-center items-start gap-1 bg-contain bg-no-repeat`}>
      <div className="font-inter font-medium text-sm ml-7 ">{title}</div>
      <div className="step-subtitle font-inter font-normal text-xs ml-7">{subtitle} test</div>
    </div>
    </>
  );
};

export default Step;
