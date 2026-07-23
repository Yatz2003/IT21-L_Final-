# CyberVault

A simple classroom CTF login system with a dark cyber theme, React frontend, and Node.js + Express backend.

## Overview

CyberVault is an educational challenge built for cybersecurity students. It includes:

- React + Vite frontend with Tailwind CSS
- Express backend with session-based authentication
- SQLite database with hashed passwords
- Protected dashboard route and logout flow
- A subtle hint encouraging curiosity and observation

## Folder Structure

`cybervault/`
- `client/` – React application
  - `src/pages/` – `Login`, `Dashboard`, `NotFound`
  - `src/components/` – reusable UI components and layout
  - `App.jsx` – main frontend router
  - `main.jsx` – React entry point
- `server/` – Express backend
  - `routes/` – API routes
  - `controllers/` – authentication handlers
  - `middleware/` – auth middleware and validation
  - `models/` – database model logic
  - `database/` – SQLite setup and seed data
  - `app.js` – server bootstrap

## Installation

1. Clone or copy the repository.
2. Open a terminal in `cybervault/client` and run:
   ```bash
   npm install
   ```
3. Open another terminal in `cybervault/server` and run:
   ```bash
   npm install
   ```

## Running Locally

1. Start the backend server:
   ```bash
   npm run dev
   ```
2. Start the frontend app:
   ```bash
   npm run dev
   ```
3. Open the URL shown by Vite in your browser.

## Authentication Flow

- The frontend sends login requests to the backend.
- The backend validates username/password and uses sessions.
- Passwords are hashed using bcrypt.
- A default seed user is created when the server starts for local testing.
- The protected dashboard route checks session state before returning content.
- Logout clears the session and returns the user to the login page.

## Educational Hint

A subtle hint is included on the dashboard and login page, encouraging students to inspect the page details.- The hidden password list is ROT13-encoded; decode all 20 entries to find the correct seed password.
## Notes

This project is designed for classroom use. It follows secure development practices and avoids real-world vulnerabilities while still offering a fun challenge.
