# New Relic Take Home Coding Assessment

**Submission By Erik Montag**

**GitHub Username: emontag47**

[Link to the private repository](https://github.com/emontag47/New-Relic-Code-Assessment)

[Link to my GitHub profile page](https://github.com/emontag47)

### Tech Stack:

- Frontend: React, TypeScript, React Testing Library, Jest
- Backend: Python, Flask, Pytest, MongoDB

## Installing and Running the Program

Clone the repository to a directory of your choice

#### Frontend

1. `cd` into the `front-end` folder
2. Run `npm ci` to install the necessary dependencies
3. Run `npm start` to spin up the program on `http://localhost:3000`
4. To run the test library, run `npm test` in the terminal window

#### Backend

1. `cd` into the `back-end` folder
2. Run `pip install -r requirements.txt` to install the necessary dependencies
3. run `python app.py` to spin up the backend on `http://127.0.0.1:5000`
4. To run the test library, run `python -m pytest` in the terminal window

#### Database

1. Install and run MongoDB via the instructions [here](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/) (MAC)
2. This brings up an instance `MongoDB` on `mongodb://localhost:27017/`. I then created and used a db named `NewRelic` and a collection named `CustomerData`
   - I used `ChatGPT` to generate a `mongosh` command to insert random data into the database following the model `{ firstName: string, lastName: string, companyName: string }`

At this point, you should be able to navigate to the frontend [link](http://localhost:3000) in your browser and view the functional program.

## Assumptions and Choices Made During Development

#### \* With every assumption or choice made, I would ask the Product Owner and Designer additional questions before programming, or run the choice by them to get their thoughts and feedback.

#### UI Design

- With no specific design requirements, I decided on a simple layout with a dark background and white text for ample contrast.
- Additionally, I have chosen to display the results as a table with a column for first name, last name, and company, believing this is a clear way to display all of the data from the database.
  - I would work with the PO and/or designer to rework any of these design choices to ensure the best user experience. I would also work with them to determine if this is the information we want displayed.

#### Frontend

- I implemented options A and B from the spec. I have situated them next to each other with the results displaying directly below them, fairly similar to the GitHub UX mentioned in the spec.
- For option A, I created the `SearchBar` component to allow users to search for customer information by name. The component allows for user text input and when the user clicks `Search`, the component sends the search term to the `SearchComponent` component, which I will discuss below. A call to the backend is made and information tied to any customer with a first or last name that matches the search term is displayed below the search bar.
  - The query is sent to the backend via this url: `http://127.0.0.1:5000/customers?search={searchTerm}`.
- For option B, I created the `CompanyDropdown` component to allow users to filter customer records by their company. When the component renders, with the help of the `useEffect` hook, the program makes a call to the backend `/companies` endpoint to receive a list of distinct companies that are present in the database. The component then displays these companies as options in the dropdown element. When a user chooses a company from the list, the company name is sent to the `SearchComponent` component, which I will discuss below. A call to the backend is made and information tied to any customer with a company that matches the chosen company is displayed below the dropdown element.
  - The query is sent to the backend via this url: `http://127.0.0.1:5000/customers?filter_by_company={companyName}`.
- To display the results, I created the `SearchResults` component. The results are passed from the `SearchComponent` component as a prop and then displayed as a table. The results list is of type `Customer[]`, which I created for the use of this project. If there are no results, the text "No Results Found" appears. Otherwise, the table of results has a header row with columns titled "First Name", "Last name", and "Company". The rest of the table is populated with the results. I have this component become scrollable when it reaches a certain height. Of course, with very large datasets, pagination may be preferable, as mentioned in the spec as a possible next step during future interviews.
- To house the above components and drive much of the backend API calls, I created the `SearchComponent` component. This component has the above three as child components and receives information from them, such as the search term and company name for the search or filter options. When a search term from the `SearchBar` component is received, it makes a call to the backend with the query url above with the relevant query parameter. When it receives a company name from the `CompanyDropdown` component, it does the same. When a response comes back after either of these requests, the `results` state variable is set, which is passed as a prop to the `SearchResults` component and the results are displayed.
- Overall, I followed what I believed to be straightforward architecture. A component for each information retrieval option (A and B), a component to display the results, and a component to tie them all together and drive the necessary code. At first, I had the `SearchBar` and `CompanyDropdown` components making the API calls, receiving the results, and rendering the `SearchResults` component themselves, but then assumed the task was to build a more unified experience, and refactored the code to have the `SearchComponent` component handle much of this and render one instance of the `SearchResults` component. I also believe, how I have implemented the `SearchResults` component would allow me to implement the sorting feature from option C simpler, should it come up in future interviews.

#### Backend

- For the backend, I followed the Controller Service Repository architecture.
- For the controller layer, I have two `GET` endpoints that support the frontend. The first is the `/customers` endpoint, which can be called to receive specific customer records. The relevant service functions are called based on the query parameter received as part of the request. The second is the `/companies` endpoint, which can be called to receive a list of the distinct companies in the database. This controller also calls the relevant service function. These controllers are the gateways into the backend and leave the logic/functionality to the service layer and repository layer.
- The service layer has a few functions that are called by the controllers, as mentioned above. They call the repository layer with the parameters passed from the controller layer. For this project, this layer does not require much logic, making it fairly lightweight. A service function built to support option C would have more as it would do the sorting and ordering necessary after receiving the specified N elements from the repository layer.
- The repository layer is where the backend interacts with the `MongoDB`. It houses a few functions that help retrieve the information needed based on incoming requests. The first is the `find_customers_by_name()` function, which takes in a name as a string and queries the database to retrieve any record where the first or last name matches that string exactly (case insensitive, but a search term of "John" would not return "Johnson"). Next, the `find_customers_by_company()` function takes in a company name as a string and queries the database to retrieve any record with the company. If the incoming company name is "All Companies", it retrieves every record in the database. Finally, the `find_all_companies()` function retrieves a list of all the distinct companies present in the database.
- I used `MongoDB` as my database because I find it simple to set up and integrate with Python.

#### Testing

- I wrote relevant tests for each frontend component and backend layer. They are housed in their respective directories.

#### Looking Forward

- Apart from the next possible steps mentioned in the spec, I would plan some of the next steps to focus on authentication. Assuming a real-world implementation of this application would house sensitive data, we would need authentication on both the back and front ends. The backend could use token-based authentication to ensure only authorized users have access to the endpoints. Similarly, the frontend could have an authentication/login page to ensure that only authorized users can access the UI. All together, these would keep the customer data accessible by this project much safer.

## Contact Information

- Phone Number: (404) 680-0544
- Email: erikmontag@gmail.com
- [LinkedIn profile](https://www.linkedin.com/in/erik-montag/)

### Thank you for reviewing my submission. I look forward to your feedback.
