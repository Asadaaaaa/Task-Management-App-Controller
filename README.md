# Task Management App - Backend

A robust Node.js backend service for the Task Management Application that provides RESTful APIs for task management, user authentication, and more.

## Features

- User Authentication (Register/Login)
- Task Management (CRUD operations)
- JWT-based Authentication
- MongoDB Integration

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
- `MAIL_EMAIL`: Email for notifications
- `MAIL_ETHEREAL_PASSWORD`: Email password
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
- `MAIL_EMAIL`: Email service configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.