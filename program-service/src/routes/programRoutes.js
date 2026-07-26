import express from "express";

import programController from "../controllers/programController.js";

import validateRequest from "../middleware/validateRequest.js";

import {
  validateCreateProgram,
  validateUpdateProgram,
  validateProgramId,
} from "../middleware/programValidation.js";

const router = express.Router();

router.post(
  "/",
  validateCreateProgram,
  validateRequest,
  programController.createProgram.bind(programController)
);

router.get(
  "/",
  programController.getAllPrograms.bind(programController)
);

router.get(
  "/:id",
  validateProgramId,
  validateRequest,
  programController.getProgramById.bind(programController)
);

router.put(
  "/:id",
  validateProgramId,
  validateUpdateProgram,
  validateRequest,
  programController.updateProgram.bind(programController)
);

router.delete(
  "/:id",
  validateProgramId,
  validateRequest,
  programController.deleteProgram.bind(programController)
);

export default router;