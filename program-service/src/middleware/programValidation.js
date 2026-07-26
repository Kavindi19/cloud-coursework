import { body, param } from "express-validator";

export const validateProgramId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Program ID must be a positive integer."),
];

export const validateCreateProgram = [
  body("eventId")
    .notEmpty()
    .withMessage("Event ID is required.")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Event ID must be a positive integer."),

  body("day")
    .trim()
    .notEmpty()
    .withMessage("Day is required.")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Day must not exceed 50 characters."),

  body("track")
    .trim()
    .notEmpty()
    .withMessage("Track is required.")
    .bail()
    .isLength({ max: 150 })
    .withMessage("Track must not exceed 150 characters."),

  body("session")
    .trim()
    .notEmpty()
    .withMessage("Session is required.")
    .bail()
    .isLength({ max: 200 })
    .withMessage("Session must not exceed 200 characters."),

  body("speakerName")
    .trim()
    .notEmpty()
    .withMessage("Speaker name is required.")
    .bail()
    .isLength({ max: 150 })
    .withMessage("Speaker name must not exceed 150 characters."),

  body("startTime")
    .notEmpty()
    .withMessage("Start time is required.")
    .bail()
    .isISO8601()
    .withMessage("Start time must be a valid ISO 8601 date and time."),

  body("endTime")
    .notEmpty()
    .withMessage("End time is required.")
    .bail()
    .isISO8601()
    .withMessage("End time must be a valid ISO 8601 date and time."),
];

export const validateUpdateProgram = [
  body()
    .custom((value) => {
      const allowedFields = [
        "eventId",
        "day",
        "track",
        "session",
        "speakerName",
        "startTime",
        "endTime",
      ];

      const suppliedFields = Object.keys(value);

      if (suppliedFields.length === 0) {
        throw new Error("At least one field must be provided.");
      }

      const invalidFields = suppliedFields.filter(
        (field) => !allowedFields.includes(field)
      );

      if (invalidFields.length > 0) {
        throw new Error(
          `Invalid field(s): ${invalidFields.join(", ")}.`
        );
      }

      return true;
    }),

  body("eventId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Event ID must be a positive integer."),

  body("day")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Day cannot be empty.")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Day must not exceed 50 characters."),

  body("track")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Track cannot be empty.")
    .bail()
    .isLength({ max: 150 })
    .withMessage("Track must not exceed 150 characters."),

  body("session")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Session cannot be empty.")
    .bail()
    .isLength({ max: 200 })
    .withMessage("Session must not exceed 200 characters."),

  body("speakerName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Speaker name cannot be empty.")
    .bail()
    .isLength({ max: 150 })
    .withMessage("Speaker name must not exceed 150 characters."),

  body("startTime")
    .optional()
    .isISO8601()
    .withMessage("Start time must be a valid ISO 8601 date and time."),

  body("endTime")
    .optional()
    .isISO8601()
    .withMessage("End time must be a valid ISO 8601 date and time."),
];