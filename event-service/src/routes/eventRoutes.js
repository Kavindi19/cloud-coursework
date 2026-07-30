import express from "express";

import {
  createEvent,
  getAllEvents,
  getEventById,
  allocateSeats,
  updateEvent,
  deleteEvent
} from "../controllers/eventController.js";

import {
  validateEventId,
  validateCreateEvent,
  validateUpdateEvent,
  handleValidationErrors
} from "../middleware/eventValidation.js";

const router = express.Router();

// Create a new event
router.post(
  "/",
  validateCreateEvent,
  handleValidationErrors,
  createEvent
);

// Get all events
router.get("/", getAllEvents);

// Allocate seats for an event
router.post(
  "/:id/allocate-seats",
  validateEventId,
  handleValidationErrors,
  allocateSeats
);

// Get one event by ID
router.get(
  "/:id",
  validateEventId,
  handleValidationErrors,
  getEventById
);

// Update an event
router.put(
  "/:id",
  validateEventId,
  validateUpdateEvent,
  handleValidationErrors,
  updateEvent
);

// Delete an event
router.delete(
  "/:id",
  validateEventId,
  handleValidationErrors,
  deleteEvent
);

export default router;