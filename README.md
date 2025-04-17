This repository contains the source code for a MERN Stack Blog Application. The app allows users to register, log in, and manage blog posts. It is built using the following technologies:

MongoDB: For storing user data and blog posts.
Express.js: Backend framework for handling API routes.
React.js: Frontend framework for building the user interface (not included in the provided code).
Node.js: Runtime environment for the backend.
Features:
User Authentication:

User registration with hashed passwords using bcrypt.
Secure login with password validation.
Blog Management:

Create, read, update, and delete blog posts (CRUD operations).
Database:

MongoDB is used as the database, connected via Mongoose.

Environment Variables:
The app uses a .env file to store sensitive information like the MongoDB connection string:

How to Run:
Clone the repository.
Install dependencies using npm install.
Set up the .env file with your MongoDB connection string.
Start the server using npm start.
This app serves as a foundation for building a full-stack blogging platform with user authentication and secure data handling.
