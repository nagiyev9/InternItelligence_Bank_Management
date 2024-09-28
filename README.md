# Bank Management System

This is a Bank Management System API where users can create and delete accounts, manage their bank cards, and perform various banking operations like deposits, withdrawals, payments, and transferring money between cards. Users can also view their transaction history. The project includes user authentication and authorization, secured with JWT tokens, and implements security best practices such as bcrypt for password hashing, input validation, and rate-limiting to prevent abuse.

## Features

- **Account Management**: Create and delete bank accounts.
- **Card Management**: Add and remove cards.
- **Transactions**: Deposit, withdraw, make payments, and transfer money between cards.
- **Transaction History**: View all transaction history for an account.
- **User Authentication**: Secure authentication using JWT and password hashing with bcrypt.
- **Security**: Input validation, rate-limiting, and HTTP headers security with Helmet.
  
## Prerequisites

- **Node.js**: Make sure you have [Node.js](https://nodejs.org/) installed.
- **MongoDB**: You need to have access to a running instance of MongoDB.
- **npm**: Ensure npm is installed (it comes with Node.js).

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/bank-management-system.git
    cd bank-management-system
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Create a `.env` file** in the root directory and add the following environment variables:

    ```env
    MONGO_URI=your_mongo_database_uri
    JWT_SECRET_KEY=your_jwt_secret_key
    JWT_REFRESH_SECRET_KEY=your_jwt_refresh_secret_key
    ```

4. **Run the application:**

    ```bash
    npm start
    ```

    The server will start on `http://localhost:4000`.

## API Endpoints

### Authentication

- **POST** `/auth/register`: Register a new user.
- **POST** `/auth/login`: Log in an existing user and get JWT tokens.

### Account Management

- **DELETE** `/auth/delete/:id`: Delete an existing user.

### Card Management

- **GET** `/card/all`: See all user cards
- **POST** `/card/create`: Add a new card to an account.
- **DELETE** `/card/remove-card/:cardId`: Remove a card from an account.

### Transactions

- **PUT** `/card/increase/:cardId`: Deposit money into an account.
- **PUT** `/card/withdraw/:cardId`: Withdraw or pay money from an account.
- **PUT** `/card/send/:cardId`: Transfer money to another card.
- **PUT** `/card/set-password/:cardID`: Set password and activate the card.

### Transaction History

- **GET** `/history/all/:cardId`: View all transaction history for a user.

## Validation and Security

- **Validation**: This project uses `express-validator` to validate user input.
- **Rate-Limiting**: To prevent brute force attacks, rate-limiting is applied using `express-rate-limit`.
- **Password Hashing**: Passwords are hashed using `bcrypt` to ensure user data security.
- **JWT Authentication**: JSON Web Tokens (JWT) are used for secure authentication.

## Rate-Limiter

The rate limiter restricts repeated requests to public APIs and is configured with the following default limits:

- **Max Requests**: 5 requests per a minutes.
- **Rate-Limiter Middleware**: Applied on sensitive routes like login.

## Technologies Used

- **Node.js**: JavaScript runtime for backend development.
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database for storing user data, accounts, and transaction histories.
- **Mongoose**: MongoDB object modeling for Node.js.
- **bcrypt**: Password hashing library to store secure user passwords.
- **JWT (jsonwebtoken)**: Used for securing authentication via JSON Web Tokens.
- **express-validator**: Middleware for input validation and sanitization.
- **express-rate-limit**: Middleware to limit repeated requests.
- **Helmet**: Helps secure Express apps by setting various HTTP headers.

## Project Structure

```bash
.
├── database/
│   └── db.js         # Environment variables configuration
├── controllers/
│   └── auth-controller.js  # Handles authentication logic
│   └── card-controller.js  # Handles card management logic
│   └── history-controller.js  # Handles transaction logic
├── models/
│   └── User.js           # User schema
|   └── Refresh-Token.js  # Token schema
│   └── Account.js        # Account schema
│   └── Card.js           # Card schema
│   └── Transaction-History.js    # Transaction history schema
├── routes/
│   └── auth.js     # Authentication routes
│   └── index.js    # Main route
│   └── card.js     # Card routes
│   └── history.js  # Transaction routes
├── middleware/
│   └── auth.js # Middleware to protect routes
│   └── limiter.js    # Middleware to apply rate limiting
│   └── validation.js    # Middleware to check validation
│   └── card-validation.js    # Middleware to check validation
├── utils/
│   └── generate-card-details.js # Generate functions
├── .env                  # Environment variables
├── app.js                # Main app file
├── README.md             # This file
└── package.json          # Project dependencies and scripts
```

## Running Tests
```bash
npm start
```

## License
This project is licensed under the MIT License.

## Contact
For questions or collaboration, feel free to reach out via [meheddinngyv9@gmail.com].
