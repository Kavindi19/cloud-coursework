import registrationService from "../services/registrationService.js";

class RegistrationController {
  async createRegistration(req, res, next) {
    try {
      const registration =
        await registrationService.createRegistration(req.body);

      return res.status(201).json({
        success: true,
        message: "Registration created successfully.",
        data: registration,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllRegistrations(req, res, next) {
    try {
      const registrations =
        await registrationService.getAllRegistrations();

      return res.status(200).json({
        success: true,
        count: registrations.length,
        data: registrations,
      });
    } catch (error) {
      next(error);
    }
  }

  async getRegistrationById(req, res, next) {
    try {
      const registration =
        await registrationService.getRegistrationById(
          req.params.id
        );

      return res.status(200).json({
        success: true,
        data: registration,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateRegistration(req, res, next) {
    try {
      const registration =
        await registrationService.updateRegistration(
          req.params.id,
          req.body
        );

      return res.status(200).json({
        success: true,
        message: "Registration updated successfully.",
        data: registration,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteRegistration(req, res, next) {
    try {
      await registrationService.deleteRegistration(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message: "Registration deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new RegistrationController();