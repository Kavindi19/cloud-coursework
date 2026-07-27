import { Router } from "express";

import registrationController from "../controllers/registrationController.js";

import {
  validateCreateRegistration,
  validateRegistrationId,
  validateUpdateRegistration,
} from "../middleware/registrationValidation.js";

import validateRequest from "../middleware/validateRequest.js";

const router = Router();

router.post(
  "/",
  validateCreateRegistration,
  validateRequest,
  registrationController.createRegistration
);

router.get(
  "/",
  registrationController.getAllRegistrations
);

router.get(
  "/:id",
  validateRegistrationId,
  validateRequest,
  registrationController.getRegistrationById
);

router.put(
  "/:id",
  validateRegistrationId,
  validateUpdateRegistration,
  validateRequest,
  registrationController.updateRegistration
);

router.delete(
  "/:id",
  validateRegistrationId,
  validateRequest,
  registrationController.deleteRegistration
);

export default router;