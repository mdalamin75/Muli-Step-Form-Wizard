import React, { useState, useEffect } from 'react';
// import '../styles/searchBar.css';
import cooccurrencePairs from '../cooccurrence_pairs.json';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (searchTerm.trim()) {
      const words = searchTerm.toLowerCase().split(/\s+/);
      const lastWord = words[words.length - 1];

      // Filter pairs where the source matches the last typed word
      const matchedPairs = cooccurrencePairs
        .filter(pair => pair.source === lastWord)
        .sort((a, b) => b.count - a.count); // Sort by descending count

      // Take top 5 suggestions
      const topSuggestions = matchedPairs.slice(0, 5).map(pair => pair.target);
      setSuggestions(topSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSuggestionClick = (suggestion) => {
    const words = searchTerm.trim().split(/\s+/);
    words[words.length - 1] = suggestion;
    setSearchTerm(words.join(' ') + ' ');
  };

  return (
    <div className="w-2/3">
      <input
        type="text"
        className="search-bar border border-slate-200 px-5 py-5 rounded-full w-full"
        placeholder="Search robots..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
