# Calendar App
 
A full-stack calendar web app where users can create, edit, and delete personal notes and events on specific dates.
 
Live demo: https://calendar-app-yuze.onrender.com
 
---
 
## Features
 
- User registration and login with session-based authentication
- Password hashing with bcrypt
- Create, edit, and delete notes on any calendar date
- Event count badges visible on each day square
- Navigate between months
- Protected routes — calendar only accessible when logged in
---
 
 ## Getting Started
 
### Prerequisites
- Node.js
- MongoDB Atlas account
### Backend Setup
 
1. Clone the backend repo and install dependencies:
```bash
   git clone https://github.com/Vetint02/calendar-app-backend
   cd calendar-app-backend
   npm install
```
 
2. Create a `.env` file in the root:
```
   MONGODB_URI=your_mongodb_connection_string
   sessionSecret=your_session_secret
```
 
3. Start the server:
```bash
   node server.js
```
 
### Frontend Setup
 
1. Clone the frontend repo and install dependencies:
```bash
   git clone https://github.com/Vetint02/calendar_app
   cd calendar_app
   npm install
```
 
2. Create a `.env` file in the root:
```
   VITE_API_URL=http://localhost:5000
```
 
3. Start the dev server:
```bash
   npm run dev
```
 
---

## Tech Stack
 
**Frontend**
- React
- React Router
- Material UI
- Vite
**Backend**
- Node.js
- Express
- Passport.js (local strategy)
- express-session + connect-mongo
- MongoDB + Mongoose
- bcrypt
**Deployed on**
- Render (frontend as static site, backend as web service)
- MongoDB Atlas (database)

---
 
## API Endpoints
 
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/user/register | Register a new user |
| POST | /api/auth/login | Log in |
| POST | /api/auth/logout | Log out |
| GET | /api/auth/me | Check auth status |
| GET | /api/content | Get notes for a specific day |
| GET | /api/content/month | Get all notes for a month |
| POST | /api/content/create | Create a new note |
| PUT | /api/content/update | Edit a note |
| DELETE | /api/content/delete/:id | Delete a note |
 
---