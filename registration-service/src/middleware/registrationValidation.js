import { body, param } from "express-validator";

const allowedFields = [
  "eventId",
  "name",
  "email",
  "ticketCount",
];

export const validateRegistrationId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Registration ID must be a positive integer."),
];

export const validateCreateRegistration = [
  body("eventId")
    .notEmpty()
    .withMessage("Event ID is required.")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Event ID must be a positive integer."),

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required.")
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must contain between 2 and 100 characters."),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .bail()
    .isEmail()
    .withMessage("A valid email address is required.")
    .normalizeEmail(),

  body("ticketCount")
    .notEmpty()
    .withMessage("Ticket count is required.")
    .bail()
    .isInt({ min: 1, max: 10 })
    .withMessage(
      "Ticket count must be an integer between 1 and 10."
    ),

  body().custom((requestBody) => {
    const invalidFields = Object.keys(requestBody).filter(
      (field) => !allowedFields.includes(field)
    );

    if (invalidFields.length > 0) {
      throw new Error(
        `Invalid field(s): ${invalidFields.join(", ")}.`
      );
    }

    return true;
  }),
];

export const validateUpdateRegistration = [
  body("eventId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Event ID must be a positive integer."),

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty.")
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must contain between 2 and 100 characters."),

  body("email")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty.")
    .bail()
    .isEmail()
    .withMessage("A valid email address is required.")
    .normalizeEmail(),

  body("ticketCount")
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage(
      "Ticket count must be an integer between 1 and 10."
    ),

  body().custom((requestBody) => {
    const bodyFields = Object.keys(requestBody);

    if (bodyFields.length === 0) {
      throw new Error(
        "At least one field must be provided for the update."
      );
    }

    const invalidFields = bodyFields.filter(
      (field) => !allowedFields.includes(field)
    );

    if (invalidFields.length > 0) {
      throw new Error(
        `Invalid field(s): ${invalidFields.join(", ")}.`
      );
    }

    return true;
  }),
];