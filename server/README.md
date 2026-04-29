# TODO App — Backend

Express.js REST API with MongoDB persistence.

## Tech Stack
- Node.js + Express.js
- MongoDB + Mongoose
- CORS, dotenv

## Setup

### Prerequisites
- Node.js 18+
- MongoDB (Atlas account or local installation)

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```
Edit `.env` and set your MongoDB connection string.

**MongoDB Atlas (recommended):**
1. Create a free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a database user and whitelist your IP
3. Copy the connection string into `MONGO_URI`

### 3. Run the server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server runs on `http://localhost:5000`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/todos | Get all todos |
| POST | /api/todos | Create a todo |
| PUT | /api/todos/:id | Update title/description |
| PATCH | /api/todos/:id/done | Toggle done status |
| DELETE | /api/todos/:id | Delete a todo |

## Assumptions & Limitations
- No authentication — this is a single-user app
- Todos are sorted by creation date (newest first)
- Title is required; description is optional