# Digital Registration System for Music Education Institution

## Project Overview

The Digital Registration System for Music Education Institution is a full-stack web application designed to streamline course registration, user management, and payment tracking. It provides a user-friendly interface for students to explore courses, register, and manage payments. Additionally, administrators can efficiently manage users, courses, and notifications using an intuitive backend.

The project uses:
- **Frontend**: HTML, CSS, JavaScript, EJS (Embedded JavaScript templates)
- **Backend**: Node.js with Express.js
- **Database**: MySQL

---

## Features

### Student Features
- Browse and register for music courses.
- Track registration status in real-time.
- Make secure payments for enrolled courses.
- View notifications and manage their student profile.

### Admin Features
- Manage users, courses, registrations, and payments.
- Send system notifications to students and instructors.
- Track administrative actions and generate reports.

---

## Technologies Used

### Frontend
- HTML5, CSS3, JavaScript
- EJS for server-side rendering

### Backend
- Node.js with Express.js

### Database
- MySQL with normalized relational tables

---

## Prerequisites

To run this project locally, ensure you have the following installed:
1. **Node.js** (v14 or higher)
2. **npm** (Node Package Manager)
3. **MySQL** (v8.0 or higher)

---

## Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/SarahNajjar/midas-project.git
cd midas-project
```

### Step 2: Install Dependencies
Install the required Node.js modules:
```bash
npm install
```

### Step 3: Configure the Environment Variables
Create a `.env` file in the root directory and copy the following template:

```env
# APP CONFIGURATION
PORT=3000  # The port on which the application will run.

# DATABASE CONFIGURATION
DB_HOST=127.0.0.1        # Host address for the database.
DB_USER=root             # Database username.
DB_PASS=root             # Password for the database user.
DB_PORT=3307             # Port on which the database is running.
DB_NAME=music_education_db  # Name of the database being used.
```

Ensure your MySQL server matches these configurations.

### Step 4: Import the Database
1. Open MySQL Workbench or any MySQL client.
2. Create the database:
   ```sql
   CREATE DATABASE music_education_db;
   ```
3. Import the database structure and data:
   ```bash
   mysql -u root -p music_education_db < music_education_dump.sql
   ```

### Step 5: Start the Server
Run the application in development mode:
```bash
npm run dev
```

Access the app at [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
/project-root
│
├── /controllers            # Logic for handling routes
├── /models                 # Database models
├── /routes                 # API route definitions
├── /views                  # EJS templates for frontend rendering
├── /public                 # Static files (CSS, images, JS)
├── /middlewares            # Custom middleware
├── .env                    # Environment variables
├── server.js               # Main server entry point
├── package.json            # Project metadata and scripts
└── README.md               # Project documentation
```

---

## API Endpoints

### Users API (`/api/users`)
- `GET /manageUsers`: Fetch all users.
- `POST /register`: Register a new user.
- `POST /login`: Log in a user.
- `GET /:id`: Get a user by ID.
- `POST /update-user/:id`: Update a user.
- `GET /delete/:id`: Delete a user.

### Courses API (`/api/courses`)
- `GET /availableCourses`: Fetch all available courses.
- `POST /add-course`: Add a new course.
- `GET /courseDetails/:id`: Fetch a course by ID.
- `POST /update-course/:id`: Update a course.
- `GET /delete-course/:id`: Delete a course.

### Registrations API (`/api/registrations`)
- `GET /`: Fetch all registrations.
- `POST /`: Register a user for a course.
- `GET /status`: Check registration status.
- `POST /update`: Update a registration.

### Payments API (`/api/payments`)
- `GET /registrations/:registration_id/payments`: Fetch payments for a registration.
- `POST /create`: Create a payment record.
- `GET /delete/:id`: Delete a payment record.

### Notifications API (`/api/notifications`)
- `GET /:userId`: Fetch notifications for a user.
- `POST /`: Create a notification.
- `PUT /:notificationId/read`: Mark a notification as read.

---

## Running the Application

### Development Mode
Run the application with:
```bash
npm run dev
```

### Production Mode
(Not configured yet, but typically use `npm start` after building static assets.)

---

## Troubleshooting

1. **Database Connection Issues**
   - Verify MySQL is running and matches `.env` configurations.
   - Ensure the database dump is imported successfully.

2. **Port Already in Use**
   - Change the `PORT` value in the `.env` file if port 3000 is occupied.

3. **Dependency Issues**
   - Reinstall dependencies:
     ```bash
     npm install
     ```

4. **Invalid Environment Configuration**
   - Double-check `.env` syntax and ensure all keys are defined.

---

## Sample Data

The database includes the following sample data:
- **Users**: Example students, instructors, and admins.
- **Courses**: Preloaded music courses like "Jazz Improvisation Workshop" and "Music Theory Basics."
- **Registrations**: Sample student registrations.

---

## Future Enhancements

1. Add JWT-based authentication for secure user sessions.
2. Integrate third-party payment gateways (e.g., Stripe or PayPal).
3. Build RESTful APIs for mobile and third-party integrations.

---

