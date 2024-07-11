import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './CompanyDropdown.module.css';

interface CompanyDropdownProps {
  onChange: (companyName: string) => void;
}

// CompanyDropdown component to give user the option of filtering customers by company (Option B from the spec)
const CompanyDropdown: React.FC<CompanyDropdownProps> = ({ onChange }) => {
  const [companies, setCompanies] = useState<string[]>([]);

  // On mount, fetch all distinct companies from the backend to be used as options in the dropdown
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/companies');
        if (response.data) {
          setCompanies(response.data);
        } else {
          console.error('Error: Response data is undefined');
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  // Render component, send selected company to SearchComponent
  return (
    <div className={styles.dropdownContainer}>
      <h4>Filter By Company</h4>
      <select className={styles.dropdown} onChange={(e) => onChange(e.target.value)}>
        <option value="All Companies">All Companies</option>
        {companies.map((company, index) => (
          <option key={index} value={company}>
            {company}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CompanyDropdown;
