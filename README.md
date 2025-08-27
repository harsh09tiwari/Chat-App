# Chat-App

A full-stack real-time chat application with user authentication, friend requests, and messaging features. Built with Node.js (Express) for the backend and React (Vite) for the frontend.

## Features

- User authentication (Sign Up, Login)
- Real-time messaging
- Friend requests and management
- Profile and settings pages
- Responsive and modern UI

## Project Structure

```
Chat-App/
│
├── backend/      # Node.js Express server
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── lib/           # Utilities (DB, Cloudinary, Socket)
│   │   ├── middlewares/   # Auth middleware
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   └── index.js       # Server entry point
│   └── package.json
│
├── frontend/     # React client (Vite)
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── constants/     # App constants
│   │   ├── lib/           # Axios, utils
│   │   ├── pages/         # Main pages
│   │   ├── store/         # Zustand stores
│   │   ├── App.jsx        # App entry
│   │   └── main.jsx       # Main entry
│   ├── public/            # Static assets
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB running locally or remotely

### Backend Setup

1. Go to the `backend` folder:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file (see `.env.example` if available) and set your environment variables (MongoDB URI, JWT secret, etc.).
4. Start the server:
   ```
   npm start
   ```

### Frontend Setup

1. Go to the `frontend` folder:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser at `http://localhost:5173`

## Usage

- Sign up or log in to your account.
- Add friends and send friend requests.
- Start chatting in real time.

## Technologies Used

- **Backend:** Node.js, Express, MongoDB, Mongoose, Socket.io
- **Frontend:** React, Vite, Zustand, Axios

## Contributing

Feel free to fork the repo, make changes, and submit pull requests!


## Click on this link to open

https://chat-app-lj71.onrender.com

