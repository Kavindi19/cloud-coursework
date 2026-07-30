import { Prisma } from "@prisma/client";
import * as eventRepository from "../repositories/eventRepository.js";
import { AppError } from "../utils/AppError.js";

//new

import {
  LambdaClient,
  InvokeCommand
} from "@aws-sdk/client-lambda";

//new

const lambdaClient = new LambdaClient({
  region: process.env.AWS_REGION || "us-east-2"
});

const LOW_SEAT_THRESHOLD =
  Number(process.env.LOW_SEAT_THRESHOLD || 10);

//new

async function sendLowSeatNotification(event) {

  const functionName =
    process.env.LOW_SEAT_LAMBDA_FUNCTION;

  if (!functionName) {
    console.log(
      "LOW_SEAT_LAMBDA_FUNCTION is not configured."
    );

    return;
  }

  const payload = {
    eventId: event.id,
    eventName: event.title,
    remainingSeats: event.seatsAvailable
  };

  const command = new InvokeCommand({
    FunctionName: functionName,
    InvocationType: "Event",
    Payload: Buffer.from(JSON.stringify(payload))
  });

  await lambdaClient.send(command);

  console.log(
    "Low-seat notification sent."
  );
}

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

//new

export async function allocateSeats(
  eventId,
  ticketCount
) {

  const id = Number(eventId);

  const tickets = Number(ticketCount);

  const event =
    await eventRepository.getEventById(id);

  if (!event) {
    throw new AppError(
      "Event not found.",
      404
    );
  }

  const updatedEvent =
    await eventRepository.allocateSeats(
      id,
      tickets
    );

  if (!updatedEvent) {
    throw new AppError(
      "Not enough seats available.",
      400
    );
  }

  if (
    updatedEvent.seatsAvailable <
    LOW_SEAT_THRESHOLD
  ) {
    await sendLowSeatNotification(
      updatedEvent
    );
  }

  return updatedEvent;
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