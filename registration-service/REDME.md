# Registration Service

## Overview

The Registration Service is a RESTful microservice developed using **Node.js**, **Express.js**, **Prisma ORM**, and **PostgreSQL**. It manages event registrations by providing CRUD operations for creating, retrieving, updating, and deleting registration records.

This service is part of the Cloud Computing coursework event management system and is containerised using Docker.

---

## Features

- Create a registration
- Retrieve all registrations
- Retrieve a registration by ID
- Update a registration
- Delete a registration
- PostgreSQL database integration
- Prisma ORM
- Docker support
- Swagger API documentation
- Health check endpoint

---

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- Docker
- Swagger UI

---

## Project Structure

```
registration-service/
│── prisma/
│── src/
│   ├── config/
│   ├── controllers/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── .dockerignore
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── prisma.config.ts
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /health | Health check |
| POST | /api/registrations | Create a registration |
| GET | /api/registrations | Retrieve all registrations |
| GET | /api/registrations/:id | Retrieve a registration by ID |
| PUT | /api/registrations/:id | Update a registration |
| DELETE | /api/registrations/:id | Delete a registration |

---

## Registration Model

| Field | Type |
|------|------|
| id | Integer |
| eventId | Integer |
| name | String |
| email | String |
| ticketCount | Integer |
| timestamp | DateTime |
| createdAt | DateTime |
| updatedAt | DateTime |

---

## Environment Variables

Create a `.env` file using `.env.example`.

Example:

```env
DATABASE_URL="postgresql://postgres:password@db:5432/registrationdb"
PORT=3003
```

---

## Installation

Install dependencies.

```bash
npm install
```

Generate Prisma Client.

```bash
npx prisma generate
```

Run database migrations.

```bash
npx prisma migrate deploy
```

Start the application.

```bash
npm start
```

---

## Running with Docker

Build and start the service.

```bash
docker compose up --build
```

Stop the containers.

```bash
docker compose down
```

---

## Swagger Documentation

```
http://localhost:3003/api-docs
```

---

## Health Check

```
http://localhost:3003/health
```

---

## Author

MSc Cloud Computing Coursework