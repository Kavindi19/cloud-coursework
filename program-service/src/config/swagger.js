const swaggerDocument = {
  openapi: "3.0.0",

  info: {
    title: "Program Service API",
    version: "1.0.0",
    description:
      "REST API for managing event programme sessions, tracks, speakers and session times.",
  },

  servers: [
    {
      url: "http://localhost:3002",
      description: "Local development server",
    },
  ],

  tags: [
    {
      name: "Health",
      description: "Service health and status endpoints",
    },
    {
      name: "Programs",
      description: "Program agenda management endpoints",
    },
  ],

  components: {
    schemas: {
      Program: {
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

          day: {
            type: "string",
            example: "Day 1",
          },

          track: {
            type: "string",
            example: "Cloud Computing Track",
          },

          session: {
            type: "string",
            example: "Introduction to Cloud-Native Architecture",
          },

          speakerName: {
            type: "string",
            example: "Alice Brown",
          },

          startTime: {
            type: "string",
            format: "date-time",
            example: "2026-08-10T09:00:00.000Z",
          },

          endTime: {
            type: "string",
            format: "date-time",
            example: "2026-08-10T10:00:00.000Z",
          },

          createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-07-26T10:00:00.000Z",
          },

          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2026-07-26T10:00:00.000Z",
          },
        },
      },

      CreateProgramInput: {
        type: "object",

        required: [
          "eventId",
          "day",
          "track",
          "session",
          "speakerName",
          "startTime",
          "endTime",
        ],

        properties: {
          eventId: {
            type: "integer",
            minimum: 1,
            example: 1,
          },

          day: {
            type: "string",
            example: "Day 1",
          },

          track: {
            type: "string",
            example: "Cloud Computing Track",
          },

          session: {
            type: "string",
            example: "Introduction to Cloud-Native Architecture",
          },

          speakerName: {
            type: "string",
            example: "Alice Brown",
          },

          startTime: {
            type: "string",
            format: "date-time",
            example: "2026-08-10T09:00:00.000Z",
          },

          endTime: {
            type: "string",
            format: "date-time",
            example: "2026-08-10T10:00:00.000Z",
          },
        },
      },

      UpdateProgramInput: {
        type: "object",

        properties: {
          eventId: {
            type: "integer",
            minimum: 1,
            example: 1,
          },

          day: {
            type: "string",
            example: "Day 2",
          },

          track: {
            type: "string",
            example: "AI and Cloud Track",
          },

          session: {
            type: "string",
            example: "Kubernetes and Container Orchestration",
          },

          speakerName: {
            type: "string",
            example: "David Silva",
          },

          startTime: {
            type: "string",
            format: "date-time",
            example: "2026-08-11T10:30:00.000Z",
          },

          endTime: {
            type: "string",
            format: "date-time",
            example: "2026-08-11T11:30:00.000Z",
          },
        },
      },

      ValidationError: {
        type: "object",

        properties: {
          success: {
            type: "boolean",
            example: false,
          },

          message: {
            type: "string",
            example: "Validation failed.",
          },

          errors: {
            type: "array",

            items: {
              type: "object",

              properties: {
                field: {
                  type: "string",
                  example: "speakerName",
                },

                message: {
                  type: "string",
                  example: "Speaker name is required.",
                },
              },
            },
          },
        },
      },

      ErrorResponse: {
        type: "object",

        properties: {
          success: {
            type: "boolean",
            example: false,
          },

          message: {
            type: "string",
            example: "Program was not found.",
          },
        },
      },
    },
  },

  paths: {
    "/": {
      get: {
        tags: ["Health"],
        summary: "Get Program Service status",

        responses: {
          200: {
            description: "Program Service is running",

            content: {
              "application/json": {
                schema: {
                  type: "object",

                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },

                    message: {
                      type: "string",
                      example: "Program Service API is running.",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },

    "/health": {
      get: {
        tags: ["Health"],
        summary: "Get service health status",

        responses: {
          200: {
            description: "Service is healthy",

            content: {
              "application/json": {
                schema: {
                  type: "object",

                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },

                    service: {
                      type: "string",
                      example: "program-service",
                    },

                    status: {
                      type: "string",
                      example: "healthy",
                    },

                    timestamp: {
                      type: "string",
                      format: "date-time",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },

    "/api/programs": {
      post: {
        tags: ["Programs"],
        summary: "Create a new programme session",

        requestBody: {
          required: true,

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateProgramInput",
              },
            },
          },
        },

        responses: {
          201: {
            description: "Program created successfully",

            content: {
              "application/json": {
                schema: {
                  type: "object",

                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },

                    message: {
                      type: "string",
                      example: "Program created successfully.",
                    },

                    data: {
                      $ref: "#/components/schemas/Program",
                    },
                  },
                },
              },
            },
          },

          400: {
            description: "Validation error",

            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ValidationError",
                },
              },
            },
          },

          500: {
            description: "Internal server error",

            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },

      get: {
        tags: ["Programs"],
        summary: "Get all programme sessions",

        responses: {
          200: {
            description: "Programs retrieved successfully",

            content: {
              "application/json": {
                schema: {
                  type: "object",

                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },

                    count: {
                      type: "integer",
                      example: 2,
                    },

                    data: {
                      type: "array",

                      items: {
                        $ref: "#/components/schemas/Program",
                      },
                    },
                  },
                },
              },
            },
          },

          500: {
            description: "Internal server error",

            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },

    "/api/programs/{id}": {
      get: {
        tags: ["Programs"],
        summary: "Get a programme session by ID",

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,

            schema: {
              type: "integer",
              minimum: 1,
            },

            example: 1,
          },
        ],

        responses: {
          200: {
            description: "Program retrieved successfully",

            content: {
              "application/json": {
                schema: {
                  type: "object",

                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },

                    data: {
                      $ref: "#/components/schemas/Program",
                    },
                  },
                },
              },
            },
          },

          400: {
            description: "Invalid Program ID",

            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ValidationError",
                },
              },
            },
          },

          404: {
            description: "Program not found",

            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },

      put: {
        tags: ["Programs"],
        summary: "Update an existing programme session",

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,

            schema: {
              type: "integer",
              minimum: 1,
            },

            example: 1,
          },
        ],

        requestBody: {
          required: true,

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateProgramInput",
              },
            },
          },
        },

        responses: {
          200: {
            description: "Program updated successfully",

            content: {
              "application/json": {
                schema: {
                  type: "object",

                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },

                    message: {
                      type: "string",
                      example: "Program updated successfully.",
                    },

                    data: {
                      $ref: "#/components/schemas/Program",
                    },
                  },
                },
              },
            },
          },

          400: {
            description: "Validation error",

            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ValidationError",
                },
              },
            },
          },

          404: {
            description: "Program not found",

            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },

      delete: {
        tags: ["Programs"],
        summary: "Delete a programme session",

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,

            schema: {
              type: "integer",
              minimum: 1,
            },

            example: 1,
          },
        ],

        responses: {
          200: {
            description: "Program deleted successfully",

            content: {
              "application/json": {
                schema: {
                  type: "object",

                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },

                    message: {
                      type: "string",
                      example: "Program deleted successfully.",
                    },
                  },
                },
              },
            },
          },

          400: {
            description: "Invalid Program ID",

            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ValidationError",
                },
              },
            },
          },

          404: {
            description: "Program not found",

            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
  },
};

export default swaggerDocument;