import { validationResult } from "express-validator";

const validateRequest = (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const errors = result.array().map((error) => ({
      field:
        error.type === "field"
          ? error.path
          : "requestBody",
      message: error.msg,
    }));

    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors,
    });
  }

  next();
};

export default validateRequest;