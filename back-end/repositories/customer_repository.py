from pymongo import MongoClient
from config import config
import re


class CustomerRepository:
    def __init__(self, client=None):
        # Initialize the MongoDB connection
        if client is None:
            client = MongoClient(config.MONGO_URI)
        self.db = client.NewRelic
        self.collection = self.db.CustomerData

    # Function to remove _id field from MongoDB records before they are sent to the frontend
    def remove_id_field(self, doc):
        if "_id" in doc:
            del doc["_id"]
        return doc

    # Function that queries MongoDB to find any customer with a first or last name matching the one given
    def find_customers_by_name(self, name):
        regex = re.compile(f"^{name}$", re.IGNORECASE)
        query = {
            "$or": [{"firstName": {"$regex": regex}}, {"lastName": {"$regex": regex}}]
        }
        customers = list(self.collection.find(query))
        return [self.remove_id_field(customer) for customer in customers]

    # Function that queries MongoDB to find any customer with a company matching the one given
    # Returns all customers if company given is "All Companies"
    def find_customers_by_company(self, company):
        if company == "All Companies":
            customers = self.collection.find({})
        else:
            customers = list(self.collection.find({"companyName": company}))
        return [self.remove_id_field(customer) for customer in customers]

    # Function that queries the MongoDB to find a list of distinct companies
    def find_all_companies(self):
        companies = list(self.collection.distinct("companyName"))
        return companies
