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

   - Copy `config/config.env.example` to `config/config.env`
   - Update the values according to your environment

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

   - Create a `.env` file in the root of the frontend directory
   - Add your environment variables

4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

### Backend

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

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

### Backend (.env)

- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token signing

### Frontend (.env)

- `VITE_API_BASE_URL` - Backend API URL

#### Environment-Specific Configuration

The application is configured to work both locally and in production:

- For local development: Create a `.env.local` file with `VITE_API_BASE_URL=http://localhost:5000/api/v1`
- For production deployment: The `.env` file is configured with `VITE_API_BASE_URL=https://todo-mern-qxwq.onrender.com`

This setup allows the frontend to connect to the appropriate backend depending on the environment.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
