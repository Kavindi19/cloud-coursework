import * as eventService from "../services/eventService.js";

const parseEventId = (id) => {
  const eventId = Number(id);

  if (!Number.isInteger(eventId) || eventId <= 0) {
    throw new Error("Invalid event ID.");
  }

  return eventId;
};

export const createEvent = async (req, res, next) => {
  try {
    const event = await eventService.createEvent(req.body);

    res.status(201).json({
      success: true,
      message: "Event created successfully.",
      data: event
    });
  } catch (error) {
    next(error);
  }
};

export const getAllEvents = async (req, res, next) => {
  try {
    const events = await eventService.getAllEvents();

    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    next(error);
  }
};

export const getEventById = async (req, res, next) => {
  try {
    const eventId = parseEventId(req.params.id);
    const event = await eventService.getEventById(eventId);

    res.status(200).json({
      success: true,
      data: event
    });
  } catch (error) {
    next(error);
  }
};

//new 

export const allocateSeats = async (req, res, next) => {
  try {
    const eventId = parseEventId(req.params.id);

    const event = await eventService.allocateSeats(
      eventId,
      req.body.ticketCount
    );

    res.status(200).json({
      success: true,
      message: "Seats allocated successfully.",
      data: event
    });
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const eventId = parseEventId(req.params.id);
    const event = await eventService.updateEvent(eventId, req.body);

    res.status(200).json({
      success: true,
      message: "Event updated successfully.",
      data: event
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const eventId = parseEventId(req.params.id);
    await eventService.deleteEvent(eventId);

    res.status(200).json({
      success: true,
      message: "Event deleted successfully."
    });
  } catch (error) {
    next(error);
  }
};