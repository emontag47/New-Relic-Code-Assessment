// src/components/SearchResults/__tests__/SearchResults.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchResults from '../SearchResults';

describe('SearchResults', () => {
  test('renders no results message when results are empty', () => {
    render(<SearchResults results={[]} />);
    expect(screen.getByText('No Results Found')).toBeInTheDocument();
  });

  test('renders search results table with correct headers', () => {
    const results = [
      { firstName: 'John', lastName: 'Doe', companyName: 'TechNova' },
      { firstName: 'Jane', lastName: 'Smith', companyName: 'InnoWorks' },
    ];
    render(<SearchResults results={results} />);
    expect(screen.getByText('Search Results')).toBeInTheDocument();
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
  });

  test('renders search results correctly', () => {
    const results = [
      { firstName: 'John', lastName: 'Doe', companyName: 'TechNova' },
      { firstName: 'Jane', lastName: 'Smith', companyName: 'InnoWorks' },
    ];
    render(<SearchResults results={results} />);
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('TechNova')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('Smith')).toBeInTheDocument();
    expect(screen.getByText('InnoWorks')).toBeInTheDocument();
  });
});
