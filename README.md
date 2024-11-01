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
- [Technologies Used](#technologies-used)


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