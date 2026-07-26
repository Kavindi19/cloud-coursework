import programService from "../services/programService.js";

class ProgramController {
  async createProgram(req, res, next) {
    try {
      const program = await programService.createProgram(req.body);

      return res.status(201).json({
        success: true,
        message: "Program created successfully.",
        data: program,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllPrograms(req, res, next) {
    try {
      const programs = await programService.getAllPrograms();

      return res.status(200).json({
        success: true,
        count: programs.length,
        data: programs,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProgramById(req, res, next) {
    try {
      const id = Number(req.params.id);

      const program = await programService.getProgramById(id);

      return res.status(200).json({
        success: true,
        data: program,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProgram(req, res, next) {
    try {
      const id = Number(req.params.id);

      const program = await programService.updateProgram(
        id,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: "Program updated successfully.",
        data: program,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProgram(req, res, next) {
    try {
      const id = Number(req.params.id);

      await programService.deleteProgram(id);

      return res.status(200).json({
        success: true,
        message: "Program deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProgramController();