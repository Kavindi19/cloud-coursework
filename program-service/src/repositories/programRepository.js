import prisma from "../config/prisma.js";

class ProgramRepository {
  async create(programData) {
    return prisma.program.create({
      data: programData,
    });
  }

  async findAll() {
    return prisma.program.findMany({
      orderBy: [
        {
          day: "asc",
        },
        {
          startTime: "asc",
        },
      ],
    });
  }

  async findById(id) {
    return prisma.program.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id, programData) {
    return prisma.program.update({
      where: {
        id,
      },
      data: programData,
    });
  }

  async delete(id) {
    return prisma.program.delete({
      where: {
        id,
      },
    });
  }
}

export default new ProgramRepository();