import React, { useState } from 'react';
import { FaFilter } from "react-icons/fa"; // Import the filter icon

const FilterDropdown = ({ onSelect, selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="filter-dropdown">
      <button onClick={toggleDropdown} className="filter-button flex items-center bg-blue-400/50 border-none cursor-pointer rounded p-2 transition-colors ease-in-out hover:bg-blue-400">
        <FaFilter size={16} style={{ marginRight: '5px' }} /> {/* Icon instead of text */}
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div className="dropdown-menu absolute bg-white border border-slate-300 rounded p-3 mt-2 shadow-sm cursor-pointer">
          <div onClick={() => handleOptionClick('Alphabetical')} className={`${selectedOption === 'Alphabetical' ? 'selected' : ''} pb-1`}>Alphabetical</div>
          <div onClick={() => handleOptionClick('Type')} className={`${selectedOption === 'Type' ? 'selected' : ''} pb-1`}>Type</div>
          <div onClick={() => handleOptionClick('Rating')} className={`${selectedOption === 'Rating' ? 'selected' : ''}`}>Rating</div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
