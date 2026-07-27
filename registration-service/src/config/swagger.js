const swaggerDocument = {
  openapi: "3.0.0",

  info: {
    title: "Registration Service API",
    version: "1.0.0",
    description:
      "REST API for managing event registrations.",
  },

  servers: [
    {
      url: "http://localhost:3003",
      description: "Local development server",
    },
  ],

  components: {
    schemas: {
      Registration: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
          },
          eventId: {
            type: "integer",
            example: 1,
          },
          name: {
            type: "string",
            example: "Kavindi Silva",
          },
          email: {
            type: "string",
            format: "email",
            example: "kavindi@example.com",
          },
          ticketCount: {
            type: "integer",
            example: 2,
          },
          timestamp: {
            type: "string",
            format: "date-time",
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },

      RegistrationInput: {
        type: "object",
        required: [
          "eventId",
          "name",
          "email",
          "ticketCount",
        ],
        properties: {
          eventId: {
            type: "integer",
            minimum: 1,
            example: 1,
          },
          name: {
            type: "string",
            example: "Kavindi Silva",
          },
          email: {
            type: "string",
            format: "email",
            example: "kavindi@example.com",
          },
          ticketCount: {
            type: "integer",
            minimum: 1,
            maximum: 10,
            example: 2,
          },
        },
      },

      RegistrationUpdate: {
        type: "object",
        properties: {
          eventId: {
            type: "integer",
            minimum: 1,
            example: 2,
          },
          name: {
            type: "string",
            example: "Kavindi Perera",
          },
          email: {
            type: "string",
            format: "email",
            example: "kavindi.perera@example.com",
          },
          ticketCount: {
            type: "integer",
            minimum: 1,
            maximum: 10,
            example: 3,
          },
        },
      },
    },
  },

  paths: {
    "/": {
      get: {
        summary: "Check the API",
        responses: {
          200: {
            description: "Registration Service is running",
          },
        },
      },
    },

    "/health": {
      get: {
        summary: "Check service health",
        responses: {
          200: {
            description: "Service is healthy",
          },
        },
      },
    },

    "/api/registrations": {
      post: {
        summary: "Create a new registration",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegistrationInput",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Registration created successfully",
          },
          400: {
            description: "Validation failed",
          },
          409: {
            description:
              "Email already registered for this event",
          },
        },
      },

      get: {
        summary: "Get all registrations",
        responses: {
          200: {
            description: "List of registrations",
          },
        },
      },
    },

    "/api/registrations/{id}": {
      get: {
        summary: "Get registration by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "Registration found",
          },
          404: {
            description: "Registration not found",
          },
        },
      },

      put: {
        summary: "Update registration",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegistrationUpdate",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Registration updated",
          },
          400: {
            description: "Validation failed",
          },
          404: {
            description: "Registration not found",
          },
          409: {
            description:
              "Email already registered for this event",
          },
        },
      },

      delete: {
        summary: "Delete registration",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "Registration deleted",
          },
          404: {
            description: "Registration not found",
          },
        },
      },
    },
  },
};

export default swaggerDocument;