# controllers/customer_controller.py

from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from config import config
from repositories.customer_repository import CustomerRepository
from services.customer_service import CustomerService

# Initialize the database connection
client = MongoClient(config.MONGO_URI)
db = client.NewRelic

# Initialize the repository and service
customer_repository = CustomerRepository()
customer_service = CustomerService(customer_repository)

customer_bp = Blueprint("customers", __name__, url_prefix="/")


# /customers endpoint - entry point to backend for search and filter requests from the frontend
# Calls relevent service fuction based on included query paramenters
@customer_bp.route("/customers", methods=["GET"])
def get_customers():
    if "search" in request.args:
        search_param = request.args["search"]
        customers = customer_service.get_customer_data(search_param)
    elif "filter_by_company" in request.args:
        company_param = request.args["filter_by_company"]
        customers = customer_service.get_company_data(company_param)
    else:
        customers = []

    return jsonify(customers)


# /companies endpoint - entry point to backend for frontend to retrieve the list of all distinct companies in the MongoDB
@customer_bp.route("/companies", methods=["GET"])
def get_all_companies():
    companies = customer_service.get_companies()
    return jsonify(companies)
