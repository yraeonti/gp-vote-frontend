# Gp-Vote-Frontend

This project contains the frontend implementation of the GP-Vote hiring task. The application includes the following features:

- **User Authentication**: Secure login and access control for users.
- **Title Management**: Manage and organize titles within the application.
- **Web3 Wallet Integration (Metamask)**: Connect and interact with a Web3 wallet for blockchain functionality.
- **Unit and Integration Testing**: Comprehensive testing to ensure the reliability of features and code.


## Table of Contents
- [Running the Frontend](#running-the-frontend)
- [Connecting to the Backend](#connecting-to-the-backend)
- [API Documentation](#api-documentation)


### Prerequisites

- Ensure you have [VS Code](https://code.visualstudio.com/) and [Node.js](https://nodejs.org/) installed on your machine.
- Install yarn if it’s not already installed:
  ```bash
  npm install -g yarn

## Running the Frontend

- Clone this GitHub repository: [GP-Vote Frontend](https://github.com/yraeonti/gp-vote-frontend)
- Open your terminal and change the directory to `gp-vote-frontend`:
  ```bash
  cd gp-vote-frontend
- Install dependencies:
  ```bash
  yarn
- Run the development server
  ```bash
  yarn run dev
- The application should now be running locally. You can view it in your browser at http://localhost:3000

## Connecting to the Backend

- Clone Backend repository: [GP-Vote Hiring-task](https://github.com/GP-Vote/hiring-task)
- Follow the instrunctions in the Frontend.md to run backend server
- Make sure backend server is running on port 8000


> **Note**: If backend server is unable to run 
> - Comment out or uninstall all instances of the **client-req-scopes** package and make sure you have python and setuptools installed on your machine

## API Documentation

### Register User

- **Endpoint**: `POST http://localhost:8000/api/v1/register`
- **Description**: Registers a new user with their name, email, and password.
- **Request Headers**: 
  - `Content-Type: application/json`

#### Request Body

  ```json
  {
        "name": "test",
        "email": "test@gmail.com",
        "password": "your_password_here"
  }
  ```

#### Response Body

 ```json
{
    "user": {
    "username": "test",
    "email": "bzall@gmail.com",
    "password": "$2a$08$hashed_password_here",  
    "updatedAt": "2024-01-01T12:00:00.000Z",      
    "createdAt": "2024-01-01T12:00:00.000Z",    
    "deletedAt": null,                             
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    }
}
```

### Login User

- **Endpoint**: `POST http://localhost:8000/api/v1/login`
- **Description**: Login a user with email, and password.
- **Request Headers**: 
  - `Content-Type: application/json`

#### Request Body

  ```json
  {
        "email": "test@gmail.com",
        "password": "your_password_here"
  }
  ```

#### Response Body

 ```json
{
   "token": "Bearer jwt_token"
}
```

### Add Title

- **Endpoint**: `POST http://localhost:8000/api/v1/title`
- **Description**: Add Title to database.
- **Request Headers**: 
  - `Content-Type: application/json`
  -  `headers - Authorization: Bearer jwt_token`

#### Request Body

  ```json
  {
        "title": "new title",
  }
  ```

#### Response Body

 ```json
{
   "title": "I made this",
   "userId": {
 
   }

}
```

### Get Titles

- **Endpoint**: `GET http://localhost:8000/api/v1/title`
- **Description**: Get Titles from database.
- **Request Headers**: 
  - `Content-Type: application/json`
  -  `headers - Authorization: Bearer jwt_token`


#### Response Body

 ```json
[
    {
        "title": "clouds",

    },
]
```