# Task Management App - Backend

A robust Node.js backend service for the Task Management Application that provides RESTful APIs for task management, user authentication, and more.

## Features

- User Authentication (Register/Login)
- Task Management (CRUD operations)
- JWT-based Authentication
- MongoDB Integration

## Architecture

The backend follows a layered architecture pattern that separates concerns and promotes maintainability:

### Core Components

1. **Routes Layer** (`/routes`)
   - Entry point for all API endpoints
   - Handles request routing and API versioning
   - Maps HTTP methods to corresponding controllers
   - Groups related endpoints (e.g., auth routes, task routes)

2. **Controllers Layer** (`/controllers`)
   - Handles HTTP requests and responses
   - Processes incoming data
   - Coordinates between services and data presentation
   - Returns appropriate HTTP responses

3. **Services Layer** (`/services`)
   - Contains core business logic
   - Handles data processing and operations
   - Interacts with models for database operations
   - Implements business rules and validations

4. **Models Layer** (`/models`)
   - Defines database schemas
   - Handles data structure and relationships
   - Implements model-level validations
   - Manages database interactions

### Supporting Components

5. **Validators** (`/validators`)
   - Request payload validation
   - Data format verification
   - Input sanitization
   - Schema validation rules

6. **Middlewares** (`/middlewares`)
   - Authentication checks
   - Request preprocessing
   - Error handling
   - Logging and monitoring
   - CORS and security measures

7. **Helpers** (`/helpers`)
   - Utility functions
   - Common operations
   - Shared functionality

8. **Resources** (`/resources`)
   - Static resources
   - Configuration files
   - Constants and enums

### Request Flow

1. Client makes HTTP request
2. Request passes through relevant middlewares
3. Route handler directs to appropriate controller
4. Validator checks request payload
5. Controller processes request and calls service
6. Service executes business logic using models
7. Response flows back through controller
8. Client receives formatted response

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Task-Management-App/Controller
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file with the following required variables:
- `NODE_ENV`: Set environment (development/staging/production)
- `DB_MONGO_URI`: Your MongoDB connection string
- `DB_MONGO_NAME`: Database name
- `JWT_TOKEN_SECRET`: Secret key for JWT token generation
- Other configuration variables as specified in `.env.example`

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on the configured port (default: 4002 for development).

## API Documentation

For detailed API documentation, please visit:
[Postman Documentation](https://documenter.getpostman.com/view/23736615/2sAYX3q2wx)

## Project Structure

```
Controller/
├── src/
│   ├── controllers/    # Request handlers
│   ├── middlewares/    # Custom middleware functions
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── validators/     # Request validation
│   └── Main.js         # Application entry point
├── .env.example        # Environment variables template
├── package.json        # Project dependencies
└── README.md          # Project documentation
```

## Environment Variables

Key environment variables:

- `NODE_ENV`: Application environment
- `PORT`: Server port (default: 4002 for development)
- `DB_MONGO_URI`: MongoDB connection string
- `JWT_TOKEN_SECRET`: JWT secret key