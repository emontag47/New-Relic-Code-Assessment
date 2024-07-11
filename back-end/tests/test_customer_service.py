# tests/test_customer_service.py

import unittest
from unittest.mock import MagicMock
from services.customer_service import CustomerService
from repositories.customer_repository import CustomerRepository


class TestCustomerService(unittest.TestCase):
    def setUp(self):
        self.repository = MagicMock(CustomerRepository)
        self.service = CustomerService(self.repository)

    # Test get_customer_data() service function, get correct customers with given first name
    def test_get_customer_data_first_name(self):
        mock_customers = [
            {"firstName": "John", "lastName": "Doe", "companyName": "TechNova"},
            {"firstName": "John", "lastName": "Smith", "companyName": "InnoWorks"},
        ]
        self.repository.find_customers_by_name.return_value = mock_customers
        customers = self.service.get_customer_data("John")
        self.repository.find_customers_by_name.assert_called_once_with("John")
        self.assertEqual(customers, mock_customers)

    # Test get_customer_data() service function, get correct customers with given last name
    def test_get_customer_data_last_name(self):
        mock_customers = [
            {"firstName": "John", "lastName": "Doe", "companyName": "TechNova"},
            {"firstName": "Jane", "lastName": "Doe", "companyName": "InnoWorks"},
        ]
        self.repository.find_customers_by_name.return_value = mock_customers
        customers = self.service.get_customer_data("Doe")
        self.repository.find_customers_by_name.assert_called_once_with("Doe")
        self.assertEqual(customers, mock_customers)

    # Test get_company_data() service function, get correct customers with given company
    def test_get_company_data(self):
        mock_customers = [
            {"firstName": "John", "lastName": "Doe", "companyName": "TechNova"},
            {"firstName": "Jane", "lastName": "Smith", "companyName": "TechNova"},
        ]
        self.repository.find_customers_by_company.return_value = mock_customers
        customers = self.service.get_company_data("TechNova")
        self.repository.find_customers_by_company.assert_called_once_with("TechNova")
        self.assertEqual(customers, mock_customers)

    # Test get_companies() service function, get all given companies
    def test_get_companies(self):
        mock_companies = ["TechNova", "InnoWorks"]
        self.repository.find_all_companies.return_value = mock_companies
        companies = self.service.get_companies()
        self.repository.find_all_companies.assert_called_once()
        self.assertEqual(companies, mock_companies)


if __name__ == "__main__":
    unittest.main()
