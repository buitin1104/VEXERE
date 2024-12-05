import express from "express";
import Location from "../models/location.schema.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, city, coordinates } = req.body;

    if (!name || !city || !coordinates) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newLocation = new Location({
      name,
      city,
      coordinates,
    });

    const savedLocation = await newLocation.save();
    res.status(201).json(savedLocation);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating location", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const location = await Location.findById(id);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.status(200).json(location);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving location", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { city, page = "1", limit = "10" } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    let query = {};
    if (city) {
      query.city = city;
    }

    const total = await Location.countDocuments(query);
    const locations = await Location.find(query)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const pagination = {
      total,
      pages: Math.ceil(total / limitNumber),
      pageSize: limitNumber,
      current: pageNumber,
    };

    res.status(200).json({ locations, pagination });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving locations", error: error.message });
  }
});

export default router;
