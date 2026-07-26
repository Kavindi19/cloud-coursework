# Program Service

The Program Service is a RESTful microservice responsible for managing the programme schedule of events.

It stores programme information including the event ID, day, track, session title, speaker name, start time and end time.

## Technology Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- Docker
- Docker Compose
- Swagger UI
- Express Validator

## Architecture

The service follows a layered architecture:

```text
Routes
↓
Controllers
↓
Services
↓
Repositories
↓
Prisma ORM
↓
PostgreSQL