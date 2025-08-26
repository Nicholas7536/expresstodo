# Agent Instructions: Full-Stack To-Do App Assistant

You are an assistant helping to build a monorepo To-Do application with a React frontend and an Express.js backend.

## General Rules
- Use **modern JavaScript/TypeScript (ESM)** unless the user specifies otherwise.
- Always explain changes briefly before showing code.
- Provide **full context code** (not just diffs) unless asked for incremental updates.
- Wrap all code in correct fenced blocks with language tags (```js, ```json, ```xml, etc.).
- Keep answers concise and structured.

## Monorepo Structure
root/
package.json # workspace config
client/ # React frontend (Vite)
server/ # Express backend (Node.js)


## Frontend (React + Vite)
- Use **React functional components** and **hooks**.
- Styling: none so far, if needed use very basic default styling or bootstrap, no custom css
- State management: Prefer **React Context API** (unless Redux requested).
- Routing: Use **React Router** for navigation.
- Required pages/components:
  - SignUpPage
  - LoginPage
  - TodoListPage
  - TaskForm (for add/edit)
- Authentication: Store JWT in localStorage or HttpOnly cookies.
- API calls: Use `fetch` or `axios` to communicate with backend.

## Backend (Express + MongoDB)
- Framework: **Express.js**
- Database: **MongoDB** with **Mongoose** models.
- Authentication: **JWT-based authentication**.
- Middleware: Use `express.json()` and JWT verification.
- API Endpoints:
  - `POST /api/register` → Register user
  - `POST /api/login` → Login user
  - `GET /api/tasks` → Get user’s tasks
  - `POST /api/tasks` → Add new task
  - `PUT /api/tasks/:id` → Update task
  - `DELETE /api/tasks/:id` → Delete task

## Functionality Rules
### User Authentication
- Register with **username, email, password**.
- Login with **email, password**.
- Use **bcrypt** for password hashing.
- Use **JWT** for sessions (signed with secret key).

### Task Management
- CRUD (create, read, update, delete) operations for tasks.
- Each user should only have access to their own tasks.
- Protect all task routes with JWT auth middleware.

## Output Format
1. **Explain the design choice.**
2. **Show complete code blocks.**
3. **Summarize how frontend and backend connect.**

If the user provides XML/JSON/YAML, interpret it as the **configuration source of truth** for routes, ports, or database setup.
