export const swaggerDocument = {
  openapi: "3.0.3",

  info: {
    title: "Event Service API",
    version: "1.0.0",
    description:
      "REST API for creating, retrieving, updating and deleting events."
  },

  servers: [
    {
      url: "http://localhost:3001",
      description: "Local development server"
    }
  ],

  components: {
    schemas: {
      Event: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1
          },
          title: {
            type: "string",
            example: "Cloud Computing Conference"
          },
          description: {
            type: "string",
            nullable: true,
            example: "Annual cloud technology conference"
          },
          venue: {
            type: "string",
            example: "Colombo Conference Hall"
          },
          eventDate: {
            type: "string",
            format: "date-time",
            example: "2026-08-15T09:00:00.000Z"
          },
          ticketPrice: {
            type: "string",
            example: "2500.00"
          },
          capacity: {
            type: "integer",
            example: 200
          },
          seatsAvailable: {
            type: "integer",
            example: 200
          },
          createdAt: {
            type: "string",
            format: "date-time"
          },
          updatedAt: {
            type: "string",
            format: "date-time"
          }
        }
      },

      CreateEventRequest: {
        type: "object",
        required: [
          "title",
          "venue",
          "eventDate",
          "ticketPrice",
          "capacity"
        ],
        properties: {
          title: {
            type: "string",
            example: "Cloud Computing Conference"
          },
          description: {
            type: "string",
            example: "Annual cloud technology conference"
          },
          venue: {
            type: "string",
            example: "Colombo Conference Hall"
          },
          eventDate: {
            type: "string",
            format: "date-time",
            example: "2026-08-15T09:00:00.000Z"
          },
          ticketPrice: {
            type: "number",
            example: 2500
          },
          capacity: {
            type: "integer",
            example: 200
          }
        }
      }
    }
  },

  paths: {
    "/health": {
      get: {
        summary: "Check service health",
        responses: {
          200: {
            description: "Service and database are available"
          }
        }
      }
    },

    "/api/events": {
      get: {
        summary: "Get all events",
        responses: {
          200: {
            description: "List of events"
          }
        }
      },

      post: {
        summary: "Create a new event",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateEventRequest"
              }
            }
          }
        },
        responses: {
          201: {
            description: "Event created successfully"
          },
          400: {
            description: "Validation failed"
          }
        }
      }
    },

    "/api/events/{id}": {
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer"
          }
        }
      ],

      get: {
        summary: "Get an event by ID",
        responses: {
          200: {
            description: "Event found"
          },
          404: {
            description: "Event not found"
          }
        }
      },

      put: {
        summary: "Update an event",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateEventRequest"
              }
            }
          }
        },
        responses: {
          200: {
            description: "Event updated"
          },
          400: {
            description: "Invalid request"
          },
          404: {
            description: "Event not found"
          }
        }
      },

      delete: {
        summary: "Delete an event",
        responses: {
          200: {
            description: "Event deleted"
          },
          404: {
            description: "Event not found"
          }
        }
      }
    }
  }
};