# Book Store 

## Description
This is Book Store Backend with user and books CRUD API.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- Database
- Testing
- Deployment

## Installation
1. Clone the repository:
   ```bash
   git clone <repository_url>

2. Go to the project
   ```bash
   cd Ebooks-backend   

3. Install Dependencies:
   ```bash
   npm install

## Usage
1.  Start Server 
    ```bash
    npm start   

## API Reference 

## User Endpoints

### POST /api/v1/user/register
- **Description**: Register the user.
- **Request**:
  ```http
  POST /api/v1/user/register
- **Request Body**:
  ```json
  \{name:"Test User",email:"test@example.com",password:"password@12345"\}
- **Response**:
  ```json
  message:Registered Successfully


### POST /api/v1/user/register
- **Description**: Register the user.
- **Request**:
  ```http
  POST /api/v1/user/signin
- **Request Body**:
  ```json
  \{email:"test@example.com",password:"password@12345"\}
- **Response**:
  ```json
  message:Login Successfully



