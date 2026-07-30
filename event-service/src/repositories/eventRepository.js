import prisma from "../config/prisma.js";

export const createEvent = async (eventData) => {
  return prisma.event.create({
    data: eventData
  });
};

export const getAllEvents = async () => {
  return prisma.event.findMany({
    orderBy: {
      eventDate: "asc"
    }
  });
};

export const getEventById = async (id) => {
  return prisma.event.findUnique({
    where: {
      id
    }
  });
};

export const updateEvent = async (id, eventData) => {
  return prisma.event.update({
    where: {
      id
    },
    data: eventData
  });
};

//new
export const allocateSeats = async (id, ticketCount) => {
  const result = await prisma.event.updateMany({
    where: {
      id,
      seatsAvailable: {
        gte: ticketCount
      }
    },
    data: {
      seatsAvailable: {
        decrement: ticketCount
      }
    }
  });

  if (result.count === 0) {
    return null;
  }

  return prisma.event.findUnique({
    where: {
      id
    }
  });
};

//new 
export const deleteEvent = async (id) => {
  return prisma.event.delete({
    where: {
      id
    }
  });
};