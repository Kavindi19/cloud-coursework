# Event Service

A RESTful Event Management microservice developed using Node.js,
Express, Prisma and PostgreSQL.

## Technologies

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- Docker
- Docker Compose
- Swagger/OpenAPI

## Features

- Create events
- Retrieve all events
- Retrieve an event by ID
- Update events
- Delete events
- Request validation
- Centralised error handling
- API logging
- Health-check endpoint
- Swagger documentation

## Local setup

1. Install dependencies:

   npm install

2. Create `.env` from `.env.example`.

3. Start PostgreSQL:

   docker compose up -d postgres

4. Run migrations:

   npx prisma migrate dev

5. Start the API:

   npm run dev

## Docker setup

Build and start the full application:

   docker compose up --build -d

View logs:

   docker compose logs -f

Stop services:

   docker compose down

## API documentation

Swagger UI:

http://localhost:3001/api-docs

## API endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /health | Health check |
| POST | /api/events | Create an event |
| GET | /api/events | Get all events |
| GET | /api/events/:id | Get an event |
| PUT | /api/events/:id | Update an event |
| DELETE | /api/events/:id | Delete an event |