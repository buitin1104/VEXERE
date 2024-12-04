import express from "express";
import BusSchema from "../models/bus.schema.js";

const router = express.Router();

// Route POST / - Tạo mới một bus
router.post("/", async (req, res) => {
  try {
    const {
      busNumber,
      busModel,
      capacity,
      owner,
      tripIds = [],
      comments = [],
    } = req.body;

    // Tạo một instance mới cho Bus
    const newBus = new BusSchema({
      busNumber,
      busModel,
      capacity,
      owner,
      tripIds,
      comments,
    });

    // Lưu vào database
    await newBus.save();

    res.status(201).json(newBus);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating bus", error: error.message });
  }
});

export default router;
