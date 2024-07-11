import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar';
import CompanyDropdown from '../CompanyDropdown/CompanyDropdown';
import styles from './SearchComponent.module.css'
import SearchResults from '../SearchResults/SearchResults';
import { Customer } from '../../types/Customer';
import { BASE_URL } from '../../config'; // Import the base URL

// SearchComponent component is the main driver of the code, making calls to 
// the backend with information received by children components
const SearchComponent: React.FC = () => {
  const [results, setResults] = useState<Customer[]>([])
  
  // Make a call to the /customers endpoint with a search term query, set by the SearchBar component
  const handleSearch = async (name: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/customers?search=${name}`);
      if (response.data) {
        setResults(response.data);
      } else {
        console.error('Error: Response data is undefined');
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  // Make a call to the /customers endpoint with a company fulter option, set by the CompanyDropdown component
  const handleCompanyChange = async (companyName: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/customers?filter_by_company=${companyName}`);
      if (response.data) {
        setResults(response.data);
      } else {
        console.error('Error: Response data is undefined');
      }
    } catch (error) {
      console.error('Error fetching company results:', error);
    }
  };

  // Render the component, including the SearchBar, CompanyDropdown, and SearchResults components
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchOptionsContainer}>
        <SearchBar onSearch={handleSearch}/>
        <CompanyDropdown onChange={handleCompanyChange}/>
      </div>
      <SearchResults results={results}/>
    </div>
  );
};

export default SearchComponent;
