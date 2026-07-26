import programRepository from "../repositories/programRepository.js";
import AppError from "../utils/AppError.js";

class ProgramService {
  async createProgram(programData) {
    const startTime = new Date(programData.startTime);
    const endTime = new Date(programData.endTime);

    if (endTime <= startTime) {
      throw new AppError(
        "End time must be later than start time.",
        400
      );
    }

    return programRepository.create({
      eventId: Number(programData.eventId),
      day: programData.day,
      track: programData.track,
      session: programData.session,
      speakerName: programData.speakerName,
      startTime,
      endTime,
    });
  }

  async getAllPrograms() {
    return programRepository.findAll();
  }

  async getProgramById(id) {
    const program = await programRepository.findById(id);

    if (!program) {
      throw new AppError(
        `Program with ID ${id} was not found.`,
        404
      );
    }

    return program;
  }

  async updateProgram(id, programData) {
    const currentProgram = await this.getProgramById(id);

    const updateData = {};

    if (programData.eventId !== undefined) {
      updateData.eventId = Number(programData.eventId);
    }

    if (programData.day !== undefined) {
      updateData.day = programData.day;
    }

    if (programData.track !== undefined) {
      updateData.track = programData.track;
    }

    if (programData.session !== undefined) {
      updateData.session = programData.session;
    }

    if (programData.speakerName !== undefined) {
      updateData.speakerName = programData.speakerName;
    }

    if (programData.startTime !== undefined) {
      updateData.startTime = new Date(programData.startTime);
    }

    if (programData.endTime !== undefined) {
      updateData.endTime = new Date(programData.endTime);
    }

    const finalStartTime =
      updateData.startTime ?? currentProgram.startTime;

    const finalEndTime =
      updateData.endTime ?? currentProgram.endTime;

    if (finalEndTime <= finalStartTime) {
      throw new AppError(
        "End time must be later than start time.",
        400
      );
    }

    return programRepository.update(id, updateData);
  }

  async deleteProgram(id) {
    await this.getProgramById(id);

    return programRepository.delete(id);
  }
}

export default new ProgramService();