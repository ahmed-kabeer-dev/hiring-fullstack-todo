# TODO App — Frontend

React + Vite + Tailwind CSS single-page application.

## Tech Stack
- React 18
- Vite
- Tailwind CSS v4
- Axios

## Setup

### Prerequisites
- Node.js 18+
- Backend server running (see `../server/README.md`)

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```

App runs on `http://localhost:5173`. API calls are proxied to `http://localhost:5000`.

### 3. Build for production
```bash
npm run build
```

## Features
- View, create, edit, and delete todos
- Toggle done/undone with optimistic UI updates
- Completed tasks visually separated with strikethrough styling
- Form validation with user-friendly error messages
- Loading and error states handled gracefully

## Assumptions & Limitations
- Requires the backend to be running locally
- No offline support
- No pagination (suitable for small task lists)