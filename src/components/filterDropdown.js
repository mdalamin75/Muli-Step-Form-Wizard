import React, { useState } from 'react';
import { FaFilter } from "react-icons/fa"; // Import the filter icon
import '../styles/filterDropdown.css';

const FilterDropdown = ({ onSelect, selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="filter-dropdown">
      <button onClick={toggleDropdown} className="filter-button">
        <FaFilter size={16} style={{ marginRight: '5px' }} /> {/* Icon instead of text */}
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <div onClick={() => handleOptionClick('Alphabetical')} className={selectedOption === 'Alphabetical' ? 'selected' : ''}>Alphabetical</div>
          <div onClick={() => handleOptionClick('Type')} className={selectedOption === 'Type' ? 'selected' : ''}>Type</div>
          <div onClick={() => handleOptionClick('Rating')} className={selectedOption === 'Rating' ? 'selected' : ''}>Rating</div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
