import express from "express";
import BusTrip from "../models/busTrip.schema.js";
import Bus from "../models/bus.schema.js";
import Location from "../models/location.schema.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      bus,
      origin,
      destination,
      departureTime,
      arrivalTime,
      price,
      status,
    } = req.body;

    if (new Date(departureTime) >= new Date(arrivalTime)) {
      return res.status(400).json({
        message: "Departure time must be before arrival time",
      });
    }

    const existingBus = await Bus.findById(bus);
    if (!existingBus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    const existingOrigin = await Location.findById(origin);
    if (!existingOrigin) {
      return res.status(404).json({ message: "Origin location not found" });
    }

    const existingDestination = await Location.findById(destination);
    if (!existingDestination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    const newBusTrip = new BusTrip({
      bus,
      origin,
      destination,
      departureTime,
      arrivalTime,
      price,
      status,
    });

    const savedBusTrip = await newBusTrip.save();

    existingBus.trips.push(savedBusTrip._id);
    await existingBus.save();

    res.status(201).json(savedBusTrip);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating bus trip", error: error.message });
  }
});

// TODO: GET list of trips
// TODO: GET trip by ID
// TODO: PATCH update status of trip
export default router;
