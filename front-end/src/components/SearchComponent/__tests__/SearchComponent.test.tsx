import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import SearchComponent from '../SearchComponent';
import { Customer } from '../../../types/Customer';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;


describe('SearchComponent', () => {
    test('renders search bar, company dropdown, and no search results', async () => {
        render(<SearchComponent />);
        expect(screen.getByPlaceholderText(/search by name/i)).toBeInTheDocument();
        expect(screen.getByText(/filter by company/i)).toBeInTheDocument();
        expect(screen.getByText(/no results found/i)).toBeInTheDocument();
    });

    test('handles search input and displays results', async () => {
        const mockCompanies = ["TechNova", "Skyline Industries"];
        const mockResults = [
            { firstName: 'John', lastName: 'Doe', companyName: 'TechNova' },
        ];
    
        mockedAxios.get.mockResolvedValueOnce({ data: mockCompanies });
        mockedAxios.get.mockResolvedValueOnce({ data: mockResults });
  
        render(<SearchComponent />);
  
        const searchInput = screen.getByPlaceholderText(/search by name/i);
        const searchButton = screen.getByRole('button');
        fireEvent.change(searchInput, { target: { value: 'John' } });
        fireEvent.click(searchButton);
  
        await waitFor(() => {
            expect(screen.getByText('John')).toBeInTheDocument();
            expect(screen.getByText('Doe')).toBeInTheDocument();
            expect(screen.getByRole('cell', { name: 'TechNova' }));
        });
    });

    test('handles company selection and displays results', async () => {
        const mockCompanies = ["Skyline Industries", "InnoWorks"];
        const mockResults = [
          { firstName: 'Jane', lastName: 'Smith', companyName: 'InnoWorks' },
        ];
        
        mockedAxios.get.mockResolvedValueOnce({ data: mockCompanies });
        mockedAxios.get.mockResolvedValueOnce({ data: mockResults });
    
        render(<SearchComponent />);
        const dropdown = screen.getByRole('combobox');
    
        fireEvent.change(dropdown, { target: { value: 'InnoWorks' } });
    
        await waitFor(() => {
            expect(screen.getByText('Jane')).toBeInTheDocument();
            expect(screen.getByText('Smith')).toBeInTheDocument();
            expect(screen.getByRole('cell', { name: 'InnoWorks' }));
        });
    });

    test('handles search input then company selection, displays each result', async () => {
        const mockCompanies = ["TechNova", "Skyline Industries"];
        const mockSearchResults = [
            { firstName: 'John', lastName: 'Doe', companyName: 'TechNova' }
        ];
        const mockDropdownResults = [
            { firstName: 'Jane', lastName: 'Smith', companyName: 'Skyline Industries' }
        ];
    
        mockedAxios.get.mockResolvedValueOnce({ data: mockCompanies });
        mockedAxios.get.mockResolvedValueOnce({ data: mockSearchResults });
        mockedAxios.get.mockResolvedValueOnce({ data: mockDropdownResults });

  
        render(<SearchComponent />);
  
        const searchInput = screen.getByPlaceholderText(/search by name/i);
        const searchButton = screen.getByRole('button');
        fireEvent.change(searchInput, { target: { value: 'John' } });
        fireEvent.click(searchButton);
  
        await waitFor(() => {
            expect(screen.getByText('John')).toBeInTheDocument();
            expect(screen.getByText('Doe')).toBeInTheDocument();
            expect(screen.getByRole('cell', { name: 'TechNova' }));
        });

        const dropdown = screen.getByRole('combobox');
    
        fireEvent.change(dropdown, { target: { value: 'Skyline Industries' } });
    
        await waitFor(() => {
            expect(screen.getByText('Jane')).toBeInTheDocument();
            expect(screen.getByText('Smith')).toBeInTheDocument();
            expect(screen.getByRole('cell', { name: 'Skyline Industries' }));
        });
    });

    test('handles company selection then search input, displays each result', async () => {
        const mockCompanies = ["TechNova", "Skyline Industries"];
        const mockSearchResults = [
            { firstName: 'John', lastName: 'Doe', companyName: 'TechNova' }
        ];
        const mockDropdownResults = [
            { firstName: 'Jane', lastName: 'Smith', companyName: 'Skyline Industries' }
        ];
    
        mockedAxios.get.mockResolvedValueOnce({ data: mockCompanies });
        mockedAxios.get.mockResolvedValueOnce({ data: mockDropdownResults });
        mockedAxios.get.mockResolvedValueOnce({ data: mockSearchResults });
  
        render(<SearchComponent />);

        const dropdown = screen.getByRole('combobox');
    
        fireEvent.change(dropdown, { target: { value: 'Skyline Industries' } });
    
        await waitFor(() => {
            expect(screen.getByText('Jane')).toBeInTheDocument();
            expect(screen.getByText('Smith')).toBeInTheDocument();
            expect(screen.getByRole('cell', { name: 'Skyline Industries' }));
        });

         // Simulate search input and click
         const searchInput = screen.getByPlaceholderText(/search by name/i);
         const searchButton = screen.getByRole('button');
         fireEvent.change(searchInput, { target: { value: 'John' } });
         fireEvent.click(searchButton);
   
         // Wait for results to be displayed
         await waitFor(() => {
             expect(screen.getByText('John')).toBeInTheDocument();
             expect(screen.getByText('Doe')).toBeInTheDocument();
             expect(screen.getByRole('cell', { name: 'TechNova' }));
         });
    });

    test('handles search input with no results', async () => {
        const mockCompanies = ["TechNova", "Skyline Industries"];
        const emptyMock = [] as Customer[];
    
        mockedAxios.get.mockResolvedValueOnce({ data: mockCompanies });
        mockedAxios.get.mockResolvedValueOnce({ data: emptyMock });
  
        render(<SearchComponent />);
  
        const searchInput = screen.getByPlaceholderText(/search by name/i);
        const searchButton = screen.getByRole('button');
        fireEvent.change(searchInput, { target: { value: 'John' } });
        fireEvent.click(searchButton);
        
  
        await waitFor(() => {
            expect(screen.getByText(/no results found/i)).toBeInTheDocument();
        });
    });
});
