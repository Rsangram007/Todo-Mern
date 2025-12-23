# Todo-MERN Application

A full-stack Todo application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Project Structure

```
Todo-Mern/
├── BACKEND/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── package.json
│   └── server.js
└── FRONTEND/
    ├── public/
    ├── src/
    ├── package.json
    └── vite.config.js
```

## Features

- User authentication (registration/login)
- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Filter todos by status
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB database (local or cloud instance)
- npm or yarn package manager

## Installation

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd BACKEND
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   - For local development: Use `config/config.local.env` as reference and update values according to your local environment
   - For production: Use `config/config.prod.env` as reference and update values according to your production environment
   - The application will automatically load the correct environment file based on the NODE_ENV setting

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd FRONTEND
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   - For development: Use `.env.development` as reference
   - For production: Use `.env.production` as reference
   - The application will automatically load the correct environment file based on the mode setting

4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

### Backend

- `npm run dev` - Start development server with nodemon (uses local environment)
- `npm run dev:local` - Start development server with nodemon (explicitly uses local environment)
- `npm run prod` - Start production server (uses production environment)
- `npm start` - Start production server (default Node.js script)
- `npm test` - Run tests

### Frontend

- `npm run dev` - Start development server (uses development environment)
- `npm run dev:local` - Start development server (explicitly uses development environment)
- `npm run build` - Build for production
- `npm run build:dev` - Build for development environment
- `npm run build:prod` - Build for production environment
- `npm run preview` - Preview production build
- `npm run preview:dev` - Preview development build
- `npm run preview:prod` - Preview production build

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Tasks

- `GET /api/tasks` - Get all tasks for authenticated user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Environment Variables

A sample `.env` file has been provided in the root directory as a template for required environment variables. Copy and modify this file to create your own `.env` file.

### Backend

The backend now supports separate environment configurations:

- Local development: `config/config.local.env`
- Production: `config/config.prod.env`

The application automatically loads the appropriate environment file based on the NODE_ENV setting:

- When NODE_ENV=development, it loads `config/config.local.env`
- When NODE_ENV=production, it loads `config/config.prod.env`

Available environment variables:

- `NODE_ENV` - Environment mode (development/production)
- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token signing
- `JWT_EXPIRE` - JWT token expiration time
- `FRONTEND_URL` - Frontend application URL for CORS configuration

### Frontend (.env)

- `VITE_API_BASE_URL` - Backend API URL

#### Environment-Specific Configuration

The frontend now supports separate environment configurations:

- Development: `.env.development`
- Production: `.env.production`

The application automatically loads the appropriate environment file based on the mode setting:

- When mode=development, it loads `.env.development`
- When mode=production, it loads `.env.production`

This setup allows the frontend to connect to the appropriate backend depending on the environment.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
