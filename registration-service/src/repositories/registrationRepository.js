import prisma from "../config/prisma.js";

class RegistrationRepository {
  async create(data) {
    return prisma.registration.create({
      data,
    });
  }

  async findAll() {
    return prisma.registration.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id) {
    return prisma.registration.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id, data) {
    return prisma.registration.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id) {
    return prisma.registration.delete({
      where: {
        id,
      },
    });
  }

  async findByEmailAndEvent(email, eventId) {
    return prisma.registration.findFirst({
      where: {
        email,
        eventId,
      },
    });
  }
}

export default new RegistrationRepository();