import { body, param, validationResult } from "express-validator";

export const validateEventId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Event ID must be a positive integer.")
];

export const validateCreateEvent = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ min: 3, max: 150 })
    .withMessage("Title must contain between 3 and 150 characters."),

  body("description")
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters."),

  body("venue")
    .trim()
    .notEmpty()
    .withMessage("Venue is required.")
    .isLength({ max: 200 })
    .withMessage("Venue cannot exceed 200 characters."),

  body("eventDate")
    .notEmpty()
    .withMessage("Event date is required.")
    .isISO8601()
    .withMessage("Event date must be a valid ISO 8601 date.")
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error("Event date must be in the future.");
      }

      return true;
    }),

  body("ticketPrice")
    .notEmpty()
    .withMessage("Ticket price is required.")
    .isFloat({ min: 0 })
    .withMessage("Ticket price must be zero or greater."),

  body("capacity")
    .notEmpty()
    .withMessage("Capacity is required.")
    .isInt({ min: 1 })
    .withMessage("Capacity must be a positive integer.")
];

export const validateUpdateEvent = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty.")
    .isLength({ min: 3, max: 150 })
    .withMessage("Title must contain between 3 and 150 characters."),

  body("description")
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters."),

  body("venue")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Venue cannot be empty.")
    .isLength({ max: 200 })
    .withMessage("Venue cannot exceed 200 characters."),

  body("eventDate")
    .optional()
    .isISO8601()
    .withMessage("Event date must be a valid ISO 8601 date."),

  body("ticketPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Ticket price must be zero or greater."),

  body("capacity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Capacity must be a positive integer.")
];

export function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg
      }))
    });
  }

  next();
}