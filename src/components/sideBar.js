import React, { useState } from 'react';
// import '../styles/sidebar.css';

const Sidebar = ({
  robotTypes = [], // Default to empty array if not provided
  applicationTypes = [], // Default to empty array if not provided
  gripperTypes = [], // Default to empty array if not provided
  selectedOptions = {}, // Default to empty object if not provided
  onSelect = () => { }, // Default to a no-op function


}) => {
  // Debugging to ensure props are passed correctly
  console.log('Robot Types:', robotTypes);
  console.log('Application Types:', applicationTypes);
  console.log('Gripper Types:', gripperTypes);
  console.log('Selected Options:', selectedOptions);

  const [robotCheckedStates, setRobotCheckedStates] = useState({});
  const [appCheckedStates, setAppCheckedStates] = useState({});
  const [gripCheckedStates, setGripCheckedStates] = useState({});

  const robotHandleClick = (type) => {
    setRobotCheckedStates((prevState) => ({
      ...prevState,
      [type]: !prevState[type], // Toggle the state for the specific checkbox
    }));
    onSelect('step1', type); // Call the onSelect function
  };

  const appHandleClick = (type) => {
    setAppCheckedStates((prevState) => ({
      ...prevState,
      [type]: !prevState[type], // Toggle the state for the specific checkbox
    }));
    onSelect('step2', type); // Call the onSelect function
  };

  const gripHandleClick = (type) => {
    setGripCheckedStates((prevState) => ({
      ...prevState,
      [type]: !prevState[type], // Toggle the state for the specific checkbox
    }));
    onSelect('step3', type); // Call the onSelect function
  };

  return (
    <div className="sidebar px-5 pt-8 w-2/12 border border-slate-300 rounded-md">
      <div className="flex flex-col gap-10">
        <div>
          <h3 className="font-inter font-semibold text-base text-gray9 mb-2">Robot Type</h3>
          {robotTypes.length > 0 ? (
            <div>
              {robotTypes.map((type) => (
                // <input
                //   type="checkbox"
                //   key={type}
                //   className={selectedOptions.step1 === type ? 'active' : ''}
                //   onClick={() => onSelect('step1', type)}
                // >
                //   {type}
                // </input>
                <div
                  key={type}
                  className="flex gap-2 mb-3 cursor-pointer"
                  onClick={() => robotHandleClick(type)}
                >
                  <input
                    type="checkbox"
                    name={type}
                    id={type}
                    checked={!!robotCheckedStates[type]} // Use the state for this checkbox
                    onChange={() => { }} // Prevent default checkbox behavior
                    className="accent-blue6 w-4 rounded-full"
                  />
                  <span
                    className={`font-inter font-medium text-sm ${robotCheckedStates[type] ? 'text-blue6' : 'text-gray9'
                      }`}
                  >
                    {type}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="fallback-message">No robot types available.</p>
          )}
        </div>
        <div>
          <h3 className="font-inter font-semibold text-base text-gray9 mb-2">Application Type</h3>
          {applicationTypes.length > 0 ? (
            <div>
              {applicationTypes.map((type) => (
                // <li
                //   key={type}
                //   className={selectedOptions.step2 === type ? 'active' : ''}
                //   onClick={() => onSelect('step2', type)}
                // >
                //   {type}
                // </li>
                <div
                key={type}
                className="flex gap-2 mb-3 cursor-pointer"
                onClick={() => appHandleClick(type)}
              >
                <input
                  type="checkbox"
                  name={type}
                  id={type}
                  checked={!!appCheckedStates[type]} // Use the state for this checkbox
                  onChange={() => { }} // Prevent default checkbox behavior
                  className="accent-blue6 w-4 rounded-full"
                />
                <span
                  className={`font-inter font-medium text-sm ${appCheckedStates[type] ? 'text-blue6' : 'text-gray9'
                    }`}
                >
                  {type}
                </span>
              </div>
              ))}
            </div>
          ) : (
            <p className="fallback-message">No application types available.</p>
          )}
        </div>
        <div>
        <h3 className="font-inter font-semibold text-base text-gray9 mb-2">Gripper Type</h3>
        {gripperTypes.length > 0 ? (
          <div>
            {gripperTypes.map((type) => (
              // <li
              //   key={type}
              //   className={selectedOptions.step3 === type ? 'active' : ''}
              //   onClick={() => onSelect('step3', type)}
              // >
              //   {type}
              // </li>
              <div
              key={type}
              className="flex gap-2 mb-3 cursor-pointer"
              onClick={() => gripHandleClick(type)}
            >
              <input
                type="checkbox"
                name={type}
                id={type}
                checked={!!gripCheckedStates[type]} // Use the state for this checkbox
                onChange={() => { }} // Prevent default checkbox behavior
                className="accent-blue6 w-4 rounded-full"
              />
              <span
                className={`font-inter font-medium text-sm ${gripCheckedStates[type] ? 'text-blue6' : 'text-gray9'
                  }`}
              >
                {type}
              </span>
            </div>
            ))}
          </div>
        ) : (
          <p className="fallback-message">No gripper types available.</p>
        )}
      </div>
    </div>
    </div >
  );
};

export default Sidebar;
