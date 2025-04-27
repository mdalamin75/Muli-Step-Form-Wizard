import React from 'react';

const Dropdown = ({ options, onSelect, selectedOption }) => {
  return (
    <select
      value={selectedOption || ''}
      onChange={(e) => onSelect(e.target.value)}
      className="font-abel font-normal text-lg dropdown shadow border border-slate-300 rounded-md px-3 py-1 focus:border-blue6 focus-visible:border-blue-600 outline:none"
    >
      <option value="" className="">Can't find what you're looking for? Choose your robot type here</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;