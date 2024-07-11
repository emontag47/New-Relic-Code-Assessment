import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import CompanyDropdown from '../CompanyDropdown';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CompanyDropdown', () => {
    test('renders company dropdown with All Companies as the dafault value', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: ['TechNova', 'InnoWorks'] });

        render(<CompanyDropdown onChange={() => {}} />);

        await waitFor(() => expect(screen.getByText(/filter by company/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/All Companies/i)).toBeInTheDocument());

        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    test('company names in document when dropdown used', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: ['TechNova', 'InnoWorks'] });
    
        const mockOnChange = jest.fn();
        render(<CompanyDropdown onChange={mockOnChange} />);
        const selectElement = screen.getByRole('combobox');
    
        await waitFor(() => {
            expect(screen.getByText(/filter by company/i)).toBeInTheDocument()
            expect(screen.getByText(/TechNova/i)).toBeInTheDocument()
            expect(screen.getByText(/InnoWorks/i)).toBeInTheDocument()
        });
    });

    test('calls onChange when a company is selected', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: ['TechNova', 'InnoWorks'] });

        const mockOnChange = jest.fn();
        render(<CompanyDropdown onChange={mockOnChange} />);
        const selectElement = screen.getByRole('combobox');

        await waitFor(() => {
            expect(screen.getByText(/filter by company/i)).toBeInTheDocument()
            expect(screen.getByText(/TechNova/i)).toBeInTheDocument()
        });

        fireEvent.change(selectElement, { target: { value: 'TechNova' } });

        expect(mockOnChange).toHaveBeenCalledWith('TechNova');
    });
});
