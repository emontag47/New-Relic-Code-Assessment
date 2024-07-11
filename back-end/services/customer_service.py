# services/customer_service.py

from repositories.customer_repository import CustomerRepository


class CustomerService:
    def __init__(self, customer_repository: CustomerRepository):
        self.customer_repository = customer_repository

    # Function to search for a customer with a given name in the MongoDB
    def get_customer_data(self, search_param):
        return self.customer_repository.find_customers_by_name(search_param)

    # Function to filter customers by a given company in the MongoDB
    def get_company_data(self, company_param):
        return self.customer_repository.find_customers_by_company(company_param)

    # Function to retrieve a list of distinct copmanies in the MongoDB
    def get_companies(self):
        return self.customer_repository.find_all_companies()
