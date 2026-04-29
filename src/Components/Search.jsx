import { useState } from 'react';
import './Search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setShowResults(term.length > 0);
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input
          type="text"
          placeholder="Search sessions, instructors..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        {searchTerm && (
          <button 
            className="clear-btn"
            onClick={() => {
              setSearchTerm('');
              setShowResults(false);
            }}
          >
            ✕
          </button>
        )}
      </div>
      
      {showResults && (
        <div className="search-results">
          <div className="result-item">Search: "{searchTerm}"</div>
          <div className="result-item">Recent searches...</div>
        </div>
      )}
    </div>
  );
};

export default Search;
