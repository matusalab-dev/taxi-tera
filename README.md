
---

# Taxi-Tera Application

## Overview

Taxi-Tera is a web application designed to help users locate nearby taxi stands, rate them, and manage taxi stand data. The project consists of two main components:
1. **Frontend**: A user-friendly interface for interacting with the application.
2. **Backend**: A RESTful API providing data management and processing.

---

## Features

### Backend
- Add, update, delete, and retrieve taxi stands.
- Geospatial queries to find nearby taxi stands based on location.
- Rating system for taxi stands.
- Pagination and search functionality.
- Comprehensive API documentation (Swagger).

### Frontend
- Display taxi stands on a map.
- Search for taxi stands by name or location.
- Rate and review taxi stands.
- Responsive design for mobile and desktop users.

---

## Tech Stack

### Backend
- **Node.js** with **Express.js**: Server and API development.
- **MongoDB**: Database for storing taxi stand information.
- **Mongoose**: ODM for MongoDB.
- **Swagger**: API documentation.
- **Joi**: Request validation.
- **Render**: Deployment platform.

### Frontend
- **React.js**: Framework for building the user interface.
- **Tailwind CSS**: For styling the application.

---

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB
- npm or yarn package manager

---

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/matusalab-dev/taxi-tera.git
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the environment variables:
   - Create a `.env` file in the root directory and add the following:
     ```env
     PORT=5000
     MONGO_URI=your-mongodb-connection-string
     SECRET = your-secret
     ```

4. Start the server:
   ```bash
   npm start
   ```

5. Access the Swagger API documentation:
   - [API Documentation](https://taxi-tera.onrender.com/api-docs/)

---

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/matusalab-dev/taxi-tera.git
   cd front-end
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure API endpoints 

4. Start the development server:
   ```bash
   npm run dev
   ```
---

## Deployment

### Backend
The backend is deployed on [Render](https://render.com) and can be accessed at:
- [https://taxi-tera.onrender.com/api-docs/](https://taxi-tera.onrender.com/api-docs/)

### Frontend

---


## Contribution Guidelines

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgments

- [Render](https://render.com) for deployment.
- Open-source libraries and tools used in this project.

---