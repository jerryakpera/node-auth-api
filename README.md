# NodeJS Auth API
A NodeJS JWT authentication API that stores users on MongoDB with email and a hashed password. Routes for register, login, change password, edit email, delete user, refresh token and details (which responds with the email and date created). Creates and stores refresh tokens that is sent to refresh an access-token. 
Swagger docs can be found at localhost:<port>/api-docs.
Unit and integration tests for routes (integrated with a test MongoDB collection) and util functions using supertest and jest.

## Getting Started
To get a copy of the app
`git clone https://github.com/jerryakpera/node-auth-api.git`
`cd auth`
`npm install`

### Prerequisites
What you need to install the software and how to install them
1. [Node](https://nodejs.org/en/)
1. [NPM] `npm install npm -g`

To confirm both installations run these commands
`node --version`
v10.16.0

`npm --version`
6.13.6

### Running the tests
To run tests - tests are in **.test.js* files
`npm test`

## Built With
NodeJS, Express, MongoDB, JWT

### Contributing
Currently not accepting contributions

### Versioning
va.b.c
1. **a: major update**
2. **b: minor update**
3. **c: bug fix**

## Authors
**Jeremiah Akpera**

## License
This project is licensed under the MIT License - see the LICENSE.md file for details