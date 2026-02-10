# Visitor Registration & Product Request Management System

A full-stack web application designed to manage visitor registrations and product requests. Built with the MERN stack (MongoDB, Express, React, Node.js) and Redux for state management.

## 🚀 Features

- **User Authentication**: Secure login and registration for administrators/staff.
- **Visitor Management**: Register and track visitor details including name, company, mobile, and reason for visit.
- **Product Request Management**: Record and manage product requests with detailed specifications (category, brand, model, units, etc.).
- **Admin Dashboard**: Overview and control center for managing users, visitors, and products.
- **Production Ready**: Configured for both development and production environments.

## 🛠️ Tech Stack

- **Frontend**: React, Redux (Redux Toolkit), React Router, Axios.
- **Backend**: Node.js, Express.
- **Database**: MongoDB (via Mongoose).
- **Authentication**: JWT (JSON Web Tokens), Bcryptjs for password hashing.
- **Utilities**: Concurrently (run client and server together), Nodemon (auto-restart server), Express-fileupload.

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas)

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd vistors_regester/my-react-app
   ```

2. **Install Root Dependencies:**
   ```bash
   npm install
   ```

3. **Backend Setup:**
   - Navigate to the backend folder: `cd vistor-backend`
   - Install dependencies: `npm install`
   - Create a `.env` file in the `vistor-backend` directory and add:
     ```env
     NODE_ENV=development
     PORT=8000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. **Frontend Setup:**
   - Navigate to the frontend folder: `cd vistor-frontend`
   - Install dependencies: `npm install`
   - (Optional) Configure environment variables if needed.

## 🚀 Running the App

### Development Mode
From the **root directory** (`my-react-app`), run:
```bash
npm run dev
```
This will start both the backend server (port 8000) and the React frontend (port 3000) simultaneously using `concurrently`.

### Production Mode
1. Build the frontend:
   ```bash
   cd vistor-frontend
   npm run build
   ```
2. Start the server from the root:
   ```bash
   npm start
   ```

## 🔑 Initial Admin Setup
To create an initial admin user, run the following command from the root:
```bash
npm run create-admin
```

## 📁 Project Structure

- `vistor-backend/`: Express server, API routes, Mongoose models, and controllers.
- `vistor-frontend/`: React application, Redux slices, and UI components.
- `vistor-frontend/src/pages/`: Main views (Dashboard, Login, Register, Visitor/Product Control).
- `vistor-frontend/src/features/`: Redux logic and API services.

## 📄 License

ISC License
