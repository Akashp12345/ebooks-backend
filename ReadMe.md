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

## Packages Used <!-- Packages Used  -->

- **axios**: A promise-based HTTP client for the browser and Node.js, used to fetch data from the Google Books API.
- **bcrypt**: Used for hashing the user password.
- **cors**: Used to handle requests from different origins.
- **dotenv**: This library used for environment variables like database password and connection link.
- **express**: Used to create light nodejs application.
- **jsonwebtoken**: Used for authentication and secure data exchange.
- **mysql2**: Used fo handle MySQL server.
- **sequelize**: This ORM used for create models and database connection, CRUD operations.
- **uuid**: Used for create unique id for each documents.
- **swagger**: Used for create API documentation.

## API Reference <!-- API Reference -->

Used Swagger(OpenAPI) for API documentation. Kindly go to the given URL and check the APIs:

```bash
https://bookapi.akash-patil.info/api-docs
```

<!-- Testing Section -->

## Testing

Used jest and supertest library for testing API.

- Test Command
  ```bash
  npm test
  ```

## Deployment

### Technology Used

- **AWS EC2**: Amazon Web Services Elastic Compute Cloud (EC2) is used to deploy the server.
- **Nginx**:It is used to serve the api, handle load balancing, and manage incoming HTTP requests efficiently.
- **pm2**: It is used for manage the process and automatically restart the server on crash.
- **AWS CodePipeline**: AWS CodePipeline is used to CI/CD.

### AWS CodePipeline Stages

### Overview

Used AWS CodePipeline for CI/CD. Here are the stages typically involved in a CodePipeline setup for deploying a web application:

### Stages

1. **Source**
2. **Deploy**

### Stage Details

#### 1. Source

- **Description**: The source stage retrieves the source code for the application from a version control repository.
- **Action Provider**: AWS CodeCommit.
- **Example Configuration**:
  - **Repository**: The repository containing the source code (`ebooks-backend`).
  - **Branch**: The branch to monitor for changes (`main`).
  - **Output Artifact**: The output artifact is a ZIP file containing the source code, which is passed to the next stage.

#### 2. Deploy

- **Description**: The deploy stage takes the built artifacts and deploys them to the specified environment (EC2 instance).
- **Action Provider**: AWS CodeDeploy.
- **Configuration**: For deploy need `appspec.yml` file which contain all deployment stages.
- **Example**:
  ```yaml
   version: 0.0
   os: linux
   files:
      - source: /
        destination: /home/ubuntu/ebooks-backend
   hooks:
     AfterInstall:
        - location: .deploy.sh
        timeout: 300
        runas: root
  ```
