import pytest
import mongomock
from repositories.customer_repository import CustomerRepository


@pytest.fixture
def mock_client():
    client = mongomock.MongoClient()
    db = client.NewRelic
    collection = db.CustomerData

    # Insert mock data
    collection.insert_many(
        [
            {"firstName": "John", "lastName": "Doe", "companyName": "TechNova"},
            {"firstName": "Jane", "lastName": "Smith", "companyName": "InnoWorks"},
            {"firstName": "Steve", "lastName": "Frank", "companyName": "AlphaCorp"},
            {"firstName": "John", "lastName": "Smith", "companyName": "AlphaCorp"},
        ]
    )
    return client


@pytest.fixture
def customer_repository(mock_client):
    return CustomerRepository(mock_client)


# Test finding all companies in database
def test_find_all_companies(customer_repository):
    companies = customer_repository.find_all_companies()
    assert "TechNova" in companies
    assert "InnoWorks" in companies
    assert "AlphaCorp" in companies
    assert len(companies) == 3


# Test finding customers with given first name in database
def test_find_customers_by_first_name(customer_repository):
    customers = customer_repository.find_customers_by_name("John")
    assert len(customers) == 2
    assert customers[0]["firstName"] == "John"
    assert customers[0]["lastName"] == "Doe"
    assert customers[1]["firstName"] == "John"
    assert customers[1]["lastName"] == "Smith"


# Test finding customers with given last name in database
def test_find_customers_by_last_name(customer_repository):
    customers = customer_repository.find_customers_by_name("Smith")
    assert len(customers) == 2
    assert customers[0]["firstName"] == "Jane"
    assert customers[0]["lastName"] == "Smith"
    assert customers[1]["firstName"] == "John"
    assert customers[1]["lastName"] == "Smith"


# Test finding customers with given name that does not exist in database
def test_find__no_customers_by_name(customer_repository):
    customers = customer_repository.find_customers_by_name("Stephen")
    assert len(customers) == 0


# Test finding customers with given company in database
def test_find_customers_by_company(customer_repository):
    customers = customer_repository.find_customers_by_company("AlphaCorp")
    assert len(customers) == 2
    assert customers[0]["companyName"] == "AlphaCorp"
    assert customers[1]["companyName"] == "AlphaCorp"


# Test finding customers with given company that does not exist in database
def test_find_no_customers_by_company(customer_repository):
    customers = customer_repository.find_customers_by_company("Google")
    assert len(customers) == 0
