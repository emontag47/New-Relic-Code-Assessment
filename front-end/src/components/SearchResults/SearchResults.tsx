// src/components/SearchResults/SearchResults.tsx

import React from 'react';
import styles from './SearchResults.module.css';
import { Customer } from '../../types/Customer'

interface SearchResultsProps {
  results: Customer[];
}

// SearchResults component to display results from name search or company filter
const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  
  // If no results found, display text "No Results Found"
  if (results.length === 0) {
    return <div className={styles.resultsContainer}>No Results Found</div>;
  }

  // Render component with results displaying in a table element
  return (
    <div className={styles.resultsContainer}>
      <h2>Search Results</h2>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th className={styles.th}>First Name</th>
            <th className={styles.th}>Last Name</th>
            <th className={styles.th}>Company</th>
          </tr>
        </thead>
        <tbody>
          {results.map((customer, index) => (
            <tr key={index} className={styles.tr}>
              <td className={styles.td}>{customer.firstName}</td>
              <td className={styles.td}>{customer.lastName}</td>
              <td className={styles.td}>{customer.companyName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchResults;
