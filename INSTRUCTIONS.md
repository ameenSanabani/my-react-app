# Installation and Usage Instructions

This document provides a step-by-step guide to setting up and using the Visitor Registration and Product Request system.

## 1. Environment Configuration

Before running the application, you must set up your environment variables.

### Backend (.env)
Create a file named `.env` in the `vistor-backend/` folder:
```env
NODE_ENV=development
PORT=8000
MONGO_URI=mongodb://localhost:27017/vistor_db
JWT_SECRET=any_strong_random_string
```

## 2. Getting Started

### Initial Installation
Run this command from the `my-react-app` directory to install all necessary packages for the root, backend, and frontend:
```bash
npm install && cd vistor-backend && npm install && cd ../vistor-frontend && npm install && cd ..
```

### Create Your First User
To access the dashboard, you need a user account. You can create an initial account using the utility script:
```bash
npm run create-admin
```

## 3. Running the Application

### Development
To start the app with live-reloading:
```bash
npm run dev
```
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8000](http://localhost:8000)

## 4. Using the System

### Visitor Registration
1. Log in to the system.
2. Navigate to the **Register Visitor** page.
3. Fill in the visitor's name, company, mobile number, and reason for the visit.
4. Click submit to save the record.

### Product Requests
1. Navigate to the **Product** page.
2. Enter the product details (Brand, Model, Category, Units, etc.).
3. The system allows tracking the status and visibility of these products.

### Administration
- Use the **Dashboard** for an overview of activity.
- Use **Visitor Control** and **Product Control** pages to view, edit, or manage existing records.
- **Users Control** allows you to manage system operators.

## 5. Troubleshooting
- **Database Connection**: Ensure MongoDB is running and your `MONGO_URI` is correct.
- **Port Conflicts**: If port 8000 or 3000 is in use, you can change them in the `.env` or `package.json` files.
- **CORS Issues**: The backend is configured to allow requests from `http://localhost:3000` by default.
