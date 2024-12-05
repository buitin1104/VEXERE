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

router.get("/", async (req, res) => {
  try {
    const {
      fromCity,
      toCity,
      departureDate,
      page = "1",
      limit = "10",
    } = req.query;

    if (!fromCity || !toCity || !departureDate) {
      return res.status(400).json({
        message: "fromCity, toCity, and departureDate are required",
      });
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const departureDateObj = new Date(departureDate);
    const startOfDay = new Date(departureDateObj.setHours(0, 0, 0, 0));
    const endOfDay = new Date(departureDateObj.setHours(23, 59, 59, 999));

    const originLocations = await Location.find({ city: fromCity });
    const destinationLocations = await Location.find({ city: toCity });

    if (!originLocations.length) {
      return res
        .status(404)
        .json({ message: `Origin location with city ${fromCity} not found` });
    }

    if (!destinationLocations.length) {
      return res
        .status(404)
        .json({
          message: `Destination location with city ${toCity} not found`,
        });
    }

    let query = {
      origin: { $in: originLocations.map((location) => location._id) },
      destination: {
        $in: destinationLocations.map((location) => location._id),
      },
      departureTime: { $gte: startOfDay, $lte: endOfDay }, // departureDate trùng với ngày yêu cầu
    };

    const busTrips = await BusTrip.find(query)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .populate("origin", "name city")
      .populate("destination", "name city");

    const total = await BusTrip.countDocuments(query);

    const pagination = {
      total,
      pages: Math.ceil(total / limitNumber),
      pageSize: limitNumber,
      current: pageNumber,
    };

    res.status(200).json({
      busTrips,
      pagination,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching bus trips", error: error.message });
  }
});

// TODO: GET trip by ID
// TODO: PATCH update status of trip
export default router;
