import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';
import '@testing-library/jest-dom'; // Ensure this is included

describe('SearchBar', () => {
  test('renders search input and button', () => {
    render(<SearchBar onSearch={() => {}} />);

    const inputElement = screen.getByPlaceholderText(/search by name/i);
    const buttonElement = screen.getByRole("button");

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onSearch when search button is clicked', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText(/search by name/i);
    const buttonElement = screen.getByRole("button");

    fireEvent.change(inputElement, { target: { value: 'John' } });
    fireEvent.click(buttonElement);

    expect(mockOnSearch).toHaveBeenCalledWith('John');
  });
});