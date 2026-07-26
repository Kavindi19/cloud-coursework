import express from "express";

import {
  createEvent,
  getAllEvents,
  getEventById,
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

router.post(
  "/",
  validateCreateEvent,
  handleValidationErrors,
  createEvent
);

router.get("/", getAllEvents);

router.get(
  "/:id",
  validateEventId,
  handleValidationErrors,
  getEventById
);

router.put(
  "/:id",
  validateEventId,
  validateUpdateEvent,
  handleValidationErrors,
  updateEvent
);

router.delete(
  "/:id",
  validateEventId,
  handleValidationErrors,
  deleteEvent
);

export default router;