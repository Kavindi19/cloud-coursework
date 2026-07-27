import registrationRepository from "../repositories/registrationRepository.js";
import AppError from "../utils/AppError.js";

class RegistrationService {
  async createRegistration(data) {
    const eventId = Number(data.eventId);
    const ticketCount = Number(data.ticketCount);
    const email = data.email.trim().toLowerCase();

    const existingRegistration =
      await registrationRepository.findByEmailAndEvent(email, eventId);

    if (existingRegistration) {
      throw new AppError(
        "This email is already registered for the selected event.",
        409
      );
    }

    return registrationRepository.create({
      eventId,
      name: data.name.trim(),
      email,
      ticketCount,
    });
  }

  async getAllRegistrations() {
    return registrationRepository.findAll();
  }

  async getRegistrationById(id) {
    const registrationId = Number(id);

    const registration =
      await registrationRepository.findById(registrationId);

    if (!registration) {
      throw new AppError("Registration was not found.", 404);
    }

    return registration;
  }

  async updateRegistration(id, data) {
    const registrationId = Number(id);

    const existingRegistration =
      await registrationRepository.findById(registrationId);

    if (!existingRegistration) {
      throw new AppError("Registration was not found.", 404);
    }

    const updateData = {};

    if (data.eventId !== undefined) {
      updateData.eventId = Number(data.eventId);
    }

    if (data.name !== undefined) {
      updateData.name = data.name.trim();
    }

    if (data.email !== undefined) {
      updateData.email = data.email.trim().toLowerCase();
    }

    if (data.ticketCount !== undefined) {
      updateData.ticketCount = Number(data.ticketCount);
    }

    const finalEventId =
      updateData.eventId ?? existingRegistration.eventId;

    const finalEmail =
      updateData.email ?? existingRegistration.email;

    const duplicateRegistration =
      await registrationRepository.findByEmailAndEvent(
        finalEmail,
        finalEventId
      );

    if (
      duplicateRegistration &&
      duplicateRegistration.id !== registrationId
    ) {
      throw new AppError(
        "This email is already registered for the selected event.",
        409
      );
    }

    return registrationRepository.update(
      registrationId,
      updateData
    );
  }

  async deleteRegistration(id) {
    const registrationId = Number(id);

    const existingRegistration =
      await registrationRepository.findById(registrationId);

    if (!existingRegistration) {
      throw new AppError("Registration was not found.", 404);
    }

    return registrationRepository.delete(registrationId);
  }
}

export default new RegistrationService();