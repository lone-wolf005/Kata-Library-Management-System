# Kata Library Management System

"Kata" is a Library Management System designed to efficiently manage and organize library resources. It handles book inventory, tracks borrowing and returns, and manages user data. The system ensures that users can easily access and check out books,With features like user authentication, book availability tracking, and detailed records, "Kata" aims to streamline library operations and enhance the user experience.


## Features

- **User Authentication**: Secure login and registration for users, utilizing token-based authentication for session management.
- **Book Inventory Management**: Full control over book records, including adding, updating, and deleting entries, with real-time availability tracking.
- **Borrowing and Returning Books**: Simple and intuitive process for borrowing and returning books, with automatic updates to the system.
- **API Integration**: RESTful API endpoints for seamless integration with other systems, enabling extended functionality and third-party access..
- **Data Security and Privacy**: Implementation of strong encryption, regular backups, and secure data storage to protect user data and library records.

## Requirement

- NodeJs
- NPM (Node Package Manager)
- ExpressJs
- MongoDB
- jest
- Superjest

## Getting Started

To run this project locally:

1. Clone the repository :
 ```bash
 clone https://github.com/lone-wolf005/Kata-Library-Management-System.git
```
 

2. Navigate to the project directory : 
 ```bash
 cd Kata-Library-Management-System
```


3. Install dependencies : 

``` bash
npm install
```

4.Create a .env file in the root directory and add your environment variables:
``` bash
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```
5. Start the development server : 
``` bash
npm run dev
```

**Running Tests**
Kata includes a comprehensive suite of tests to ensure system reliability and performance. 
To run the tests:
```bash
npm test
```
## API Documentation

Kata provides a RESTful API for easy integration with other systems. Detailed API documentation is available [here][1].

[1]: https://documenter.getpostman.com/view/29232804/2sAXjM3BTV           "here"

## Acknowledgments

This project utilizes several powerful technologies and libraries:

- **[Node.js]**: A JavaScript runtime built on Chrome's V8 JavaScript engine, enabling the development of scalable network applications.

[Node.js]: https://nodejs.org/docs/latest/api/

- **[Express.js]**: A web application framework for Node.js, providing a robust set of features for web and mobile applications.

[Express.js]:https://expressjs.com/

- **[Jest]**: A delightful JavaScript testing framework that works with projects of all sizes, providing a great testing experience.

[Jest]:https://jestjs.io/docs/getting-started

- **[Supertest]**: A library for testing HTTP servers in Node.js, making it easy to test API endpoints and verify responses.

[Supertest]:https://www.npmjs.com/package/supertest

- **[MongoDB]**: A NoSQL database that allows for flexible data storage and retrieval, enabling the management of book records efficiently.

[MongoDB]:https://www.mongodb.com/docs/

These technologies work together to create a robust and efficient Library Management System. Special thanks to their communities for providing extensive documentation and support.

## Contributors

- [JIGAR THAKOR](https://github.com/lone-wolf005)