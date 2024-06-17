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
- [Testing](#testing)
- [Deployment](#deployment)

## Folder Structure <!-- All folder structure -->

- **config** : Contains configuration files for the server and database.
- **controller**: Contains controllers that manage the business logic for different resources.
- **models**: Contains MySQL models (Tables) defining the structure of the database.
- **routes**: Defines the API endpoints for user and book operations.
- **utils**: Contains test files.
- **server.js**: The main entry point of the application that initializes the server and sets up middleware.

## Requirements <!-- Requirements -->

- Nodejs
- Packages listed in `package.json`

## Packages Used <!-- Packages Used  -->

- **axios**: A promise-based HTTP client for the browser and Node.js, used to fetch data from the Google Books API.
- **bcrypt**: A library for hashing passwords, providing security for user authentication.
- **cors**: Middleware to enable Cross-Origin Resource Sharing, allowing your server to handle requests from different origins.
- **dotenv**: A module that loads environment variables from a `.env` file into `process.env`, helping to manage configuration.
- **express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **jsonwebtoken**: A library to sign, verify, and decode JSON Web Tokens, used for authentication and secure data exchange.
- **mysql2**: A fast MySQL client for Node.js, supporting prepared statements, non-blocking queries, and other features.
- **sequelize**: A promise-based ORM for Node.js and MySQL (among other databases), which supports a variety of database operations and models.
- **uuid**: A library for generating RFC-compliant UUIDs (Universally Unique Identifiers), useful for creating unique IDs for resources.

## Installation <!-- Installation -->

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

## Usage <!-- Usage -->

1.  Start Server
    ```bash
    npm start
    ```

## API Reference <!-- API Reference -->

<!-- User endpoints -->

### [User Endpoints](./routes/userRoutes.js)

### Example

<!-- This endpoint is for register the user -->

#### POST [/api/v1/user/register](./controller/userController.js#registration)

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
  "message:Registered Successfully"
  ```

  <!-- This endpoint is for login the user -->

#### POST [/api/v1/user/signin](./controller/userController.js#signin)

- **Description**: Signin the user.
- **Request**:
  ```http
  POST /api/v1/user/signin
  ```
- **Request Body**:
  ```json
  {
    "email": "test@example.com",
    "password": "password@12345"
  }
  ```
- **Response**: It will send token from headers.
  ```json
  "message:Login Successfully"
  ```

<!-- Books Endpoints -->

### [Books Endpoints](./routes/booksRoutes.js)

### Example

<!-- To retrieve all books  -->

#### GET [/api/v1/book/searchbooks/${userid}](./controller/booksController.js#AllBooks)

- **Description**: Retrieve all books based on search query(Default \* used for search all books).
- **Request**:
  ```http
  GET /api/v1/books/searchbooks/${userid}
  ```
- **Request Query**:
  ```json
  search="Jungle%20books"&pageNumber=2
  ```
- **Response**:Contain array of all books.
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

#### POST [/api/v1/book/favourite/${userid}](./controller/booksController.js#AddbookstoFavourite) <!-- Add or remove from favourite list  -->

- **Description**: Add or remove from favourite list.
- **Request**:
  ```http
  POST /api/v1/books/favourite/${userid}
  ```
- **Request Body**:
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
- **Response**:return the book.

#### POST [/api/v1/book/markasread/${userid}](./controller/booksController.js#MarkasRead) <!-- Mark as read or unread  -->

- **Description**: Mark as read or unread.
- **Request**:
  ```http
  POST /api/v1/books/markasread/${userid}
  ```
- **Request Body**:
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
- **Response**:return the book.

#### GET [/api/v1/book/myfavourite/${userid}](./controller/booksController.js#MyFavourite) <!-- Get all favourite list books  -->

- **Description**: Retrieve all favourite list books.
- **Request**:
  ```http
  GET /api/v1/books/myfavourite/${userid}
  ```
- **Request Body**:
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
- **Response**:return book.

<!-- Testing Section -->

## Testing

We used jest and supertest library for testing API.

- Test Command
  ```bash
  npm test
  ```

## Deployment

### Technology Used

- **AWS EC2**: Amazon Web Services Elastic Compute Cloud (EC2) is used to deploy the server.
- **Nginx**: Nginx is a high-performance web server and reverse proxy server. It is used to serve the website, handle load balancing, and manage incoming HTTP requests efficiently.
- **pm2**: PM2 is a production process manager for Node.js applications. It helps manage application processes, provides monitoring and logging, and ensures that applications run continuously by automatically restarting them if they crash.
- **AWS CodePipeline**: AWS CodePipeline is a continuous integration and continuous delivery (CI/CD) service for fast and reliable application updates. It automates the build, test, and deploy phases of your release process, helping to streamline the deployment of your website.


## AWS CodePipeline Stages

### Overview
AWS CodePipeline automates the build, test, and deployment phases of your release process every time there is a code change, based on the release model you define. Here are the stages typically involved in a CodePipeline setup for deploying a web application:

### Stages

1. **Source**
2. **Deploy**

### Stage Details

#### 1. Source
- **Description**: The source stage retrieves the source code for the application from a version control repository.
- **Action Provider**: AWS CodeCommit.
- **Example Configuration**:
  - **Repository**: The repository containing the source code (e.g., `my-git-repo`).
  - **Branch**: The branch to monitor for changes (e.g., `main` or `master`).
  - **Output Artifact**: The output artifact is a ZIP file containing the source code, which is passed to the next stage.

#### 2. Deploy

- **Description**: The deploy stage takes the built artifacts and deploys them to the specified environment (e.g., EC2 instances).
- **Action Provider**: AWS CodeDeploy.