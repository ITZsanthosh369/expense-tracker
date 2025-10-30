## Expense Tracker

Simple expense/income tracker with a Node/Express backend and a React frontend.

### Repository layout

- `backend/` — Node/Express API, MongoDB (Mongoose) models and routes.
- `frontend/` — React app (components under `src/Components`).

### Prerequisites

- Node.js (16+) and npm
- A MongoDB connection string

### Backend — setup & run

1. Create a `.env` file inside `backend/` with the following variables (do NOT commit secrets):

```
MONGO_URL=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_here
```

2. Install and run the backend:

```powershell
cd backend
npm install
# start normally
npm start
# or start with nodemon during development
npm run server
```

### Frontend — setup & run

```powershell
cd frontend
npm install
npm start
```

### Tests

Backend tests use Jest and Supertest. Run from the `backend/` folder:

```powershell
cd backend
npm test
```

### Notes & safety
- Do not commit `.env` or secrets. Add `backend/.env` to `.gitignore` if it's not already ignored.
- If you accidentally pushed secrets, rotate them immediately.

### Helpful git commands

- To create a safe backup branch before destructive operations:

```powershell
git branch backup-before-reset
```

- To reset local `main` to a specific commit (destructive) and force-push:

```powershell
git stash push -m "pre-reset stash"
git branch backup-before-reset
git reset --hard <commit-hash>
git push --force origin main
```

- To revert commits safely (preserves history):

```powershell
git branch backup-before-revert
git revert --no-edit <commit-or-range>
git push origin main
```

---

If you want, I can also add a `.env.example` file (without secrets) and ensure `backend/.env` is listed in `.gitignore`.
