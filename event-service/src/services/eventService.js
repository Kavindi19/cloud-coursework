import { Prisma } from "@prisma/client";
import * as eventRepository from "../repositories/eventRepository.js";
import { AppError } from "../utils/AppError.js";

export async function createEvent(eventData) {
  return eventRepository.createEvent({
    title: eventData.title.trim(),
    description: eventData.description?.trim() || null,
    venue: eventData.venue.trim(),
    eventDate: new Date(eventData.eventDate),
    ticketPrice: new Prisma.Decimal(eventData.ticketPrice),
    capacity: Number(eventData.capacity),
    seatsAvailable: Number(eventData.capacity)
  });
}

export async function getAllEvents() {
  return eventRepository.getAllEvents();
}

export async function getEventById(id) {
  const event = await eventRepository.getEventById(id);

  if (!event) {
    throw new AppError("Event not found.", 404);
  }

  return event;
}

export async function updateEvent(id, eventData) {
  const existingEvent = await eventRepository.getEventById(id);

  if (!existingEvent) {
    throw new AppError("Event not found.", 404);
  }

  const updateData = {};

  if (eventData.title !== undefined) {
    updateData.title = eventData.title.trim();
  }

  if (eventData.description !== undefined) {
    updateData.description = eventData.description?.trim() || null;
  }

  if (eventData.venue !== undefined) {
    updateData.venue = eventData.venue.trim();
  }

  if (eventData.eventDate !== undefined) {
    updateData.eventDate = new Date(eventData.eventDate);
  }

  if (eventData.ticketPrice !== undefined) {
    updateData.ticketPrice = new Prisma.Decimal(eventData.ticketPrice);
  }

  if (eventData.capacity !== undefined) {
    const newCapacity = Number(eventData.capacity);
    const soldSeats =
      existingEvent.capacity - existingEvent.seatsAvailable;

    if (newCapacity < soldSeats) {
      throw new AppError(
        "Capacity cannot be lower than the number of tickets already allocated.",
        400
      );
    }

    updateData.capacity = newCapacity;
    updateData.seatsAvailable = newCapacity - soldSeats;
  }

  return eventRepository.updateEvent(id, updateData);
}

export async function deleteEvent(id) {
  const existingEvent = await eventRepository.getEventById(id);

  if (!existingEvent) {
    throw new AppError("Event not found.", 404);
  }

  return eventRepository.deleteEvent(id);
}