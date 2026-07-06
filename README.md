# 🏡 WanderLust – Full-Stack Vacation Rental Platform

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Express.js-green?style=for-the-badge&logo=node.js">
  <img src="https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb">
  <img src="https://img.shields.io/badge/EJS-Frontend-orange?style=for-the-badge">
  <img src="https://img.shields.io/badge/Cloudinary-Image%20Storage-blue?style=for-the-badge">
  <img src="https://img.shields.io/badge/Status-Completed-success?style=for-the-badge">
</p>

---

# 📌 Overview

WanderLust is a **full-stack vacation rental platform** inspired by Airbnb that enables users to explore, create, manage, and review property listings through a secure and responsive web application.

The application follows the **MVC architecture** and provides complete CRUD functionality for listings, user authentication, image uploads, location mapping, reviews, and authorization. It integrates **Cloudinary** for image storage and **MapTiler** for geolocation services, offering a seamless booking-style experience.

---

# ✨ Features

- 🏠 Property Listing Management
- 🔍 Browse Vacation Rentals
- ➕ Create New Listings
- ✏️ Update Existing Listings
- ❌ Delete Listings
- 📸 Cloudinary Image Upload
- 🗺️ Interactive Maps using MapTiler
- 📍 Automatic Geocoding
- ⭐ User Reviews & Ratings
- 👤 Secure User Registration & Login
- 🔐 Passport.js Authentication
- 🍪 Session Management
- 🛡️ Authorization & Ownership Validation
- ✅ Server-side Form Validation using Joi
- ⚠️ Centralized Error Handling
- 📱 Responsive User Interface

---

# 🏗️ System Architecture

```
                  User
                    │
                    ▼
            EJS Frontend (UI)
                    │
                    ▼
          Node.js + Express.js
                    │
          MVC Architecture
                    │
 ┌──────────────────┼───────────────────┐
 │                  │                   │
 ▼                  ▼                   ▼
MongoDB        Cloudinary          MapTiler API
(Database)   (Image Storage)   (Maps & Geocoding)
```

---

# 🔄 Application Workflow

## User Authentication

- User Registration
- Secure Password Hashing
- User Login
- Session Management
- Logout

↓

## Property Management

- Create Property Listings
- Upload Listing Images
- Store Images on Cloudinary
- Save Property Details in MongoDB

↓

## Location Services

- Convert Location into Coordinates
- Display Interactive Map
- Show Property Marker

↓

## Review System

- Add Reviews
- Rate Properties
- Delete Own Reviews
- Display Average Ratings

↓

## Authorization

- Only Owners can Edit Listings
- Only Owners can Delete Listings
- Only Logged-in Users can Review

---

# 🚀 Key Functionalities

### 🏠 Property Listings

- Create new listings
- Edit listing details
- Delete listings
- View all available properties

### 📸 Image Upload

- Cloudinary Integration
- Automatic Image Storage
- Image Preview
- Optimized Image Delivery

### 🗺️ Maps Integration

- MapTiler API
- Forward Geocoding
- Interactive Maps
- Property Location Marker

### ⭐ Reviews

- Five-Star Rating System
- User Comments
- Review Management
- Author Validation

### 🔐 Authentication

- Passport.js Local Strategy
- Express Sessions
- Flash Messages
- Protected Routes

### 🛡️ Security

- Route Protection
- Owner Authorization
- Review Authorization
- Joi Validation
- Error Handling Middleware

---

# 💻 Tech Stack

## Frontend

- EJS
- HTML5
- CSS3
- JavaScript
- Bootstrap 5

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- Passport.js
- Passport Local
- Express Session
- Connect Mongo

## Cloud Services

- Cloudinary
- Multer
- Multer Storage Cloudinary

## Maps & APIs

- MapTiler SDK
- MapTiler Geocoding API

## Validation

- Joi

## Utilities

- Method Override
- Connect Flash
- dotenv

---

# 📂 Project Structure

```
WanderLust
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── views/
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   └── includes/
│
├── uploads/
├── app.js
├── package.json
└── README.md
```

---

# 📊 Core Modules

- User Authentication
- Property Listings
- Image Upload
- Interactive Maps
- Reviews & Ratings
- Session Management
- Authorization
- Error Handling
- Input Validation

---


# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/onkar-pandhare/Wanderlust.git
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env` file and add:

```env
ATLAS_URL=your_mongodb_connection_string

SESSION_SECRET=your_secret

CLOUD_NAME=your_cloudinary_name

CLOUD_API_KEY=your_cloudinary_key

CLOUD_API_SECRET=your_cloudinary_secret

MAPTILER_API_KEY=your_maptiler_api_key
```

## Start Application

```bash
npm start
```

Application runs at:

```
http://localhost:8080
```

---

# 🔮 Future Enhancements

- Property Booking System
- Wishlist Feature
- Payment Gateway Integration
- Advanced Search & Filters
- Nearby Attractions
- Google OAuth Login
- Email Notifications
- Admin Dashboard
- Availability Calendar
- Mobile Responsive Enhancements

---

# 👨‍💻 Developer

**Onkar Pandhare**

Information Technology Engineer

📧 Email: onkarpandhare22@gmail.com

🔗 GitHub: https://github.com/onkar-pandhare

🔗 LinkedIn: www.linkedin.com/in/onkarpandhare

---

# ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.

Your support motivates me to build more high-quality open-source projects.

---

# 📜 License

This project is developed for educational and learning purposes.
