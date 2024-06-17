# Book Store

## Description

This is Book Store Backend with user and books CRUD API.

## Table of Contents

- [Folder Structure](#folder-structure)
- [Requirements](#requirements)
- [Packages Used](#packages-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- Testing
- Deployment


## Folder Structure                                                                            <!-- All folder structure -->

- **config** : Contains configuration files for the server and database.
- **controller**: Contains controllers that manage the business logic for different resources.
- **models**: Contains MySQL models (Tables) defining the structure of the database.
- **routes**: Defines the API endpoints for user and book operations.
- **utils**: Contains test files.
- **server.js**: The main entry point of the application that initializes the server and sets up middleware.


## Requirements                                                                                <!-- Requirements -->

- Nodejs
- Packages listed in `package.json`



## Packages Used                                                                              <!-- Packages Used  -->

- **axios**: A promise-based HTTP client for the browser and Node.js, used to fetch data from the Google Books API.
- **bcrypt**: A library for hashing passwords, providing security for user authentication.
- **cors**: Middleware to enable Cross-Origin Resource Sharing, allowing your server to handle requests from different origins.
- **dotenv**: A module that loads environment variables from a `.env` file into `process.env`, helping to manage configuration.
- **express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **jsonwebtoken**: A library to sign, verify, and decode JSON Web Tokens, used for authentication and secure data exchange.
- **mysql2**: A fast MySQL client for Node.js, supporting prepared statements, non-blocking queries, and other features.
- **sequelize**: A promise-based ORM for Node.js and MySQL (among other databases), which supports a variety of database operations and models.
- **uuid**: A library for generating RFC-compliant UUIDs (Universally Unique Identifiers), useful for creating unique IDs for resources.


## Installation                                                                                 <!-- Installation --> 

1. Clone the repository:

   ```bash
   git clone <repository_url>

   ```

2. Go to the project

   ```bash
   cd Ebooks-backend

   ```

3. Install Dependencies:
   ```bash
   npm install
   ```

## Usage                                                                                              <!-- Usage -->

1.  Start Server
    ```bash
    npm start
    ```



## API Reference                                                                                 <!-- API Reference -->

<!-- User endpoints -->

### User Endpoints

### Example

<!-- This endpoint is for register the user -->

#### POST /api/v1/user/register

- **Description**: Register the user.
- **Request**:
  ```http
  POST /api/v1/user/register
  ```
- **Request Body**:
  ```json
  {
    "name": "Test User",
    "email": "test@example.com",
    "password": "password@12345"
  }
  ```
- **Response**:
  ```json
  message:Registered Successfully
  ```

<!-- Books Endpoints -->

### Books Endpoints

### Example

<!-- To retrieve all books  -->

### GET /api/v1/book/searchbooks/${userid}

- **Description**: Retrieve all books based on search query(Default \* used for search all books).
- **Request**:
  ```http
  GET /api/v1/books/searchbooks/${userid}
  ```
- **Request Query**:
  ```json
  search="Jungle%20books"&pageNumber=2
  ```
- **Response**:
  ```json
  [
    {
      "id": "BI1TEAAAQBAJ",
      "title": "Ammachi's Amazing Machines",
      "authors": ["Rajiv Eipe"],
      "category": ["Juvenile Fiction"],
      "publishedDate": "2021-12-03",
      "previewLink": "http://books.google.co.in/books?id=BI1TEAAAQBAJ&printsec=frontcover&dq=*&hl=&cd=2&source=gbs_api",
      "thumbnail": "http://books.google.com/books/content?id=BI1TEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      "favourite": false,
      "readstatus": false,
      "price": 171.49,
      "rating": 0
    }
  ]
  ```


## Testing
 We used jest and supertest library for testing API.

 - Test Command
   ```bash
   npm test
   ```

   
 

