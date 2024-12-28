# Project Management Task

A full-stack task management application built with vanilla JavaScript, Express, and Node.js that allows users to organize and track their tasks efficiently.

## Features

- **User Authentication**
  - Login/Signup system
  - Email verification
  - Password reset functionality
  - Change password option
  - Protected routes

- **Task Management**
  - Create, read, update, and delete tasks
  - Dual view options: List & Board views
  - Task status tracking (Todo, Doing, Done)
  - Due date management
  - Task attachments support

- **User Interface**
  - Responsive design for all devices
  - Modern and clean interface
  - Interactive notifications
  - Dynamic content loading
  - Smooth transitions and animations

## Technology Stack

- **Frontend:**
  - Vanilla JavaScript (ES6+)
  - HTML5
  - CSS3 (Custom Properties/Variables)
  - Iconify for icons

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - JWT for authentication

##  Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/task-management-system.git
cd task-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file in the root directory and add your environment variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_HOST=your_email_host
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
```

4. Start the development server:
```bash
npm run dev
```

## Features Implementation

### Completed Features
 User Authentication System
 Task CRUD Operations
 Responsive Design
 List & Board Views
 Task Status Management
 Email Verification
 Password Reset
 Admin Dashboard

### Dashboard Features
 Build login/signup page
 Build dashboard page
 Display tasks in two different views: list & board
 Build popups: add task & view task popups
 Build a design system using CSS custom properties
 Construct fully responsive pages
 Show/hide elements
 Show feedback notifications

## Security Features

- JWT-based authentication
- Protected API routes
- Password encryption
- Email verification
- Session management
- Role-based access control

## Responsive Design

The application is fully responsive and works on:
- Desktop computers (1200px and above)
- Tablets (768px to 1199px)
- Mobile phones (below 768px)


