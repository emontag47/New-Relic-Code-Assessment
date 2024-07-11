# tests/test_customer_controller.py

import unittest
from unittest.mock import patch
from flask import Flask
from controllers.customer_controller import customer_bp
from services.customer_service import CustomerService


class TestCustomerController(unittest.TestCase):
    def setUp(self):
        self.app = Flask(__name__)
        self.app.register_blueprint(customer_bp)
        self.client = self.app.test_client()

    # Test /customers endpoint with name search, searching by first name (?search={name})
    @patch("controllers.customer_controller.customer_service")
    def test_get_customers_first_name_search(self, mock_service):
        mock_customers = [
            {"firstName": "John", "lastName": "Doe", "companyName": "TechNova"},
            {"firstName": "John", "lastName": "Smith", "companyName": "InnoWorks"},
        ]
        mock_service.get_customer_data.return_value = mock_customers

        response = self.client.get("/customers?search=John")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, mock_customers)

    # Test /customers endpoint with name search, searching by last name (?search={name})
    @patch("controllers.customer_controller.customer_service")
    def test_get_customers_last_name_search(self, mock_service):
        mock_customers = [
            {"firstName": "John", "lastName": "Doe", "companyName": "TechNova"},
            {"firstName": "Jane", "lastName": "Doe", "companyName": "InnoWorks"},
        ]
        mock_service.get_customer_data.return_value = mock_customers

        response = self.client.get("/customers?search=Doe")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, mock_customers)

    # Test /customers endpoint with company filter (?filter_by_company={companyName})
    @patch("controllers.customer_controller.customer_service")
    def test_get_customers_filter_by_company(self, mock_service):
        mock_customers = [
            {"firstName": "John", "lastName": "Doe", "companyName": "TechNova"},
            {"firstName": "Jane", "lastName": "Smith", "companyName": "TechNova"},
        ]
        mock_service.get_company_data.return_value = mock_customers

        response = self.client.get("/customers?filter_by_company=TechNova")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, mock_customers)

    # Test /companies endpoint, finding all companies
    @patch("controllers.customer_controller.customer_service")
    def test_get_all_companies(self, mock_service):
        mock_companies = ["TechNova", "InnoWorks"]
        mock_service.get_companies.return_value = mock_companies

        response = self.client.get("/companies")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, mock_companies)


if __name__ == "__main__":
    unittest.main()
