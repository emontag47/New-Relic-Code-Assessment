import React, { useState } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (name: string) => void;
}

// SearchBar component to give user the option of searching customers by name (Option A from the spec)
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Set search term to inputted value
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

    // Pass the search term up to the parent component
  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  // Render the component
  return (
    <div className={styles.searchBarContainer}>
      <h4>Search By Name</h4>
      <input
        type="text"
        className={styles.searchInput}
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search by name"
      />
      <button className={styles.searchButton} onClick={handleSearchClick}>Search</button>
    </div>
  );
};

export default SearchBar;
