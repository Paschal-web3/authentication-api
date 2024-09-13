

# Documentation for User Authentication API

This document provides a detailed description of the API endpoints, their purpose, request parameters, and expected responses. The main purpose of this API is to provide secure user authentication and management using JWT and bcrypt.

## Table of Contents
1. [Overview](#overview)
2. [Authentication Flow](#authentication-flow)
3. [Endpoints](#endpoints)
   - [POST /register](#post-register)
   - [POST /login](#post-login)
   - [GET /users](#get-users)
   - [GET /users/:id](#get-usersid)
   - [PUT /users/:id](#put-usersid)
   - [DELETE /users/:id](#delete-usersid)
4. [Error Handling](#error-handling)
5. [Authentication with JWT](#authentication-with-jwt)
6. [Database Models](#database-models)
7. [Security Considerations](#security-considerations)

---

## Overview
The **User Authentication API** provides basic features like:
- **User Registration**: Users can register by providing details like full name, age, address, email, and password.
- **User Login**: Users can log in with their email and password, receiving a JWT for further authentication.
- **User Management**: Includes operations to retrieve, update, and delete users from the system.

The API uses MongoDB as a database to store user information, bcrypt for hashing passwords, and JWT for issuing authentication tokens.

---

## Authentication Flow

1. **Register**: User registers by providing all required fields (name, email, password, etc.). The password is hashed using bcrypt before being saved.
2. **Login**: The user logs in using the registered email and password. Upon successful authentication, a JWT token is issued.
3. **Token Verification**: The issued JWT token is sent in headers (Authorization: Bearer `token`) for subsequent requests to verify the user's identity.

---

## Endpoints

### POST /register
Registers a new user in the system.

- **URL**: `/register`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
        "Fullname": "John Doe",
        "Age": 25,
        "Address": "123 Main St",
        "Email": "johndoe@example.com",
        "Password": "password123"
    }
    ```
- **Success Response**:
    - Status: `200 OK`
    - Body:
    ```json
    {
        "message": "User Created Successfully",
        "user": { ... },
        "accesToken": "your-jwt-token"
    }
    ```

- **Error Response**:
    - Missing required fields:
    ```json
    {
        "message": "Please provide all required fields"
    }
    ```
    - User already exists:
    ```json
    {
        "message": "User already exists with this email"
    }
    ```

---

### POST /login
Logs in an existing user and returns a JWT token.

- **URL**: `/login`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
        "Email": "johndoe@example.com",
        "Password": "password123"
    }
    ```
- **Success Response**:
    - Status: `200 OK`
    - Body:
    ```json
    {
        "message": "Login Successful",
        "user": { ... },
        "loginToken": "your-jwt-token"
    }
    ```

- **Error Response**:
    - User not found:
    ```json
    {
        "message": "User not found"
    }
    ```
    - Invalid password:
    ```json
    {
        "message": "Invalid Password"
    }
    ```

---

### GET /users
Fetches all users.

- **URL**: `/users`
- **Method**: `GET`
- **Success Response**:
    - Status: `200 OK`
    - Body:
    ```json
    {
        "user": [ ... ]
    }
    ```

---

### GET /users/:id
Fetches a user by ID.

- **URL**: `/users/:id`
- **Method**: `GET`
- **Success Response**:
    - Status: `200 OK`
    - Body:
    ```json
    {
        "_id": "user-id",
        "Fullname": "John Doe",
        ...
    }
    ```

- **Error Response**:
    - User not found:
    ```json
    {
        "message": "User not found"
    }
    ```

---

### PUT /users/:id
Updates a user’s details by their ID.

- **URL**: `/users/:id`
- **Method**: `PUT`
- **Request Body**: Fields you want to update
- **Success Response**:
    - Status: `200 OK`
    - Body:
    ```json
    {
        "message": "User updated",
        "response": { ... }
    }
    ```

- **Error Response**:
    - User not found:
    ```json
    {
        "message": "User not found"
    }
    ```

---

### DELETE /users/:id
Deletes a user by ID.

- **URL**: `/users/:id`
- **Method**: `DELETE`
- **Success Response**:
    - Status: `200 OK`
    - Body:
    ```json
    {
        "message": "User deleted",
        "response": { ... }
    }
    ```

- **Error Response**:
    - User not found:
    ```json
    {
        "message": "User not found"
    }
    ```

---

## Error Handling
All errors related to missing fields or invalid data are returned with descriptive messages and appropriate status codes:
- `400 Bad Request`: For missing or invalid data.
- `404 Not Found`: For resources that do not exist (e.g., user not found).
- `500 Internal Server Error`: For any server-side issues.

---

## Authentication with JWT
- After login or registration, a JWT token is issued to the client. The token contains a payload with user data (`userId`, `Fullname`), and it expires in 1 hour.
- The client is expected to send the JWT token in the `Authorization` header for any request that requires authentication:
    ```
    Authorization: Bearer your-jwt-token
    ```

---

## Database Models

### User Schema
The user schema defines the structure of the user documents in the MongoDB database.

```javascript
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Fullname: { type: String, required: true },
    Age: { type: Number, required: true },
    Address: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);
```

---

## Security Considerations
1. **Password Hashing**: All passwords are hashed using `bcrypt` before being stored in the database, ensuring they are not stored in plain text.
2. **JWT Expiration**: Tokens expire after 1 hour, reducing the risk of unauthorized long-term access.
3. **Sensitive Data**: API secrets (e.g., `SECRET_KEY`) and database connection strings are stored securely in environment variables.

