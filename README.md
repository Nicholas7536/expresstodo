
# Full Stack To-Do App (React + Express + MongoDB)

A monorepo project for a modern, minimal To-Do application with a React (Vite) frontend and Express/MongoDB backend. Features JWT authentication, Material UI styling, and robust error handling.

## Features
- Monorepo structure with npm workspaces
- React frontend (Vite, React Router, Context API)
- Material UI for modern, minimal styling
- Express backend with MongoDB (Mongoose)
- JWT authentication and protected routes
- Task CRUD: create, read, update, delete
- Health check endpoints for server and database
- Proxy setup for seamless frontend-backend integration
- Debug logging for authentication and API errors

## Project Structure
```
.
├── client/         # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── ...
├── server/         # Express backend
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── package.json
│   └── ...
├── package.json    # Monorepo root
├── README.md
└── .gitignore
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas

### Setup
1. Clone the repository:
	```sh
	[git clone https://github.com/yourusername/todo-app-monorepo.git](https://github.com/Nicholas7536/expresstodo.git)
	cd todo-app-monorepo
	```
2. Install dependencies for all workspaces:
	```sh
	npm install
	```
3. Configure environment variables:
	- Create a `.env` file in `server/` with:
	  ```env
	  MONGO_URI=your_mongodb_connection_string
	  JWT_SECRET=your_jwt_secret
	  PORT=5000
	  ```
4. Start the development servers:
	```sh
	npm start
	```
	- Frontend: http://localhost:5173
	- Backend: http://localhost:5000

## Usage
- Register and log in to access your personal to-do list
- Add, edit, and delete tasks
- All API requests are protected with JWT (except health checks)

## Scripts
- `npm start` - Run both frontend and backend in development mode
- `npm run start:client` - Run frontend only
- `npm run start:server` - Run backend only

## Environment Variables
- `.env` in `server/` for MongoDB URI, JWT secret, and port

## Technologies
- React, Vite, Material UI
- Express, MongoDB, Mongoose
- JWT, Axios

## License
MIT

---

> Built for learning, rapid prototyping, and as a reference for full-stack best practices.
