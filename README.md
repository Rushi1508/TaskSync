# TaskSync

A fullstack task management app built with React, TypeScript, Node.js, and PostgreSQL.

## Stack

- **React + TypeScript** — Frontend UI with responsive layouts and type-safe components
- **Node.js / Express.js** — REST API backend
- **PostgreSQL** — Relational database with parameterized queries
- **HTML/CSS** — Semantic markup and styling

## Run

```bash
# Start PostgreSQL and create database
createdb tasksync

# Backend
cd server
npm install
npm run dev

# Frontend
cd client
npm install
npm start
```

API available at `http://localhost:5000/api`
Frontend available at `http://localhost:3000`

## Endpoints

| Method | Route              | Description          |
|--------|--------------------|----------------------|
| GET    | /api/tasks         | List all tasks       |
| GET    | /api/tasks/:id     | Get task by ID       |
| POST   | /api/tasks         | Create task          |
| PUT    | /api/tasks/:id     | Update task          |
| DELETE | /api/tasks/:id     | Delete task          |
| GET    | /api/users         | List users           |
| POST   | /api/users         | Create user          |

## Database Schema

- **users** — id, name, email, role, created_at
- **tasks** — id, title, description, status, priority, assigned_to (FK), created_at, updated_at
- **categories** — id, name
- **task_categories** — task_id (FK), category_id (FK)
- **comments** — id, task_id (FK), user_id (FK), body, created_at

## Features

- Create, update, and delete tasks with status tracking
- Assign tasks to users with role-based views
- Filter and sort tasks by status, priority, and assignee
- Responsive React UI with real-time state updates

## Tests

```bash
cd server
npm test
```
