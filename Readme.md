
# Authentication API

This is a Node.js API for user authentication and management. It implements user registration, login, token-based authentication using JWT, and basic user management features such as updating, deleting, and fetching user details.

## Features
- User Registration with hashed passwords
- Secure login with token-based authentication (JWT)
- Token expiration handling (1-hour tokens)
- Fetch all users or a specific user by ID
- Update user details
- Delete user

## Tech Stack
- **Node.js**: Backend runtime
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database for storing user data
- **Mongoose**: MongoDB ORM
- **bcrypt**: For hashing and verifying passwords
- **JWT (jsonwebtoken)**: For generating and verifying authentication tokens

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Paschal-web3/authentication-api.git
    cd authentication-api
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    SECRET_KEY=your-secret-key
    MONGO_URI=your-mongodb-connection-string
    ```

4. Run the server:
    ```bash
    npm start
    ```

The API will be running on `http://localhost:3000`.

## API Endpoints

### 1. Register a User
- **URL**: `/register`
- **Method**: `POST`
- **Body**: 
    ```json
    {
      "Fullname": "John Doe",
      "Age": 25,
      "Address": "123 Street",
      "Email": "johndoe@example.com",
      "Password": "password123"
    }
    ```
- **Response**:
    ```json
    {
      "message": "User Created Successfully",
      "user": { ... },
      "accesToken": "your-jwt-token"
    }
    ```

### 2. Login a User
- **URL**: `/login`
- **Method**: `POST`
- **Body**:
    ```json
    {
      "Email": "johndoe@example.com",
      "Password": "password123"
    }
    ```
- **Response**:
    ```json
    {
      "message": "Login Successful",
      "user": { ... },
      "loginToken": "your-jwt-token"
    }
    ```

### 3. Get All Users
- **URL**: `/users`
- **Method**: `GET`
- **Response**:
    ```json
    {
      "user": [ ... ] 
    }
    ```

### 4. Get User by ID
- **URL**: `/users/:id`
- **Method**: `GET`
- **Response**:
    ```json
    {
      "_id": "user-id",
      "Fullname": "John Doe",
      ...
    }
    ```

### 5. Update User
- **URL**: `/users/:id`
- **Method**: `PUT`
- **Body**: Fields you want to update
- **Response**:
    ```json
    {
      "message": "User updated",
      "response": { ... }
    }
    ```

### 6. Delete User
- **URL**: `/users/:id`
- **Method**: `DELETE`
- **Response**:
    ```json
    {
      "message": "User deleted",
      "response": { ... }
    }
    ```

## Security
- Passwords are hashed using `bcrypt` to ensure security.
- JWT tokens are used to authenticate users during login, with a token expiration of 1 hour for enhanced security.

## Contributing
Feel free to open issues or submit pull requests if you have any improvements or suggestions.

