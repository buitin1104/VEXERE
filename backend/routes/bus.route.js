import express from "express";
import Bus from "../models/bus.schema.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { busNumber, busModel, capacity, owner } = req.body;

    // TODO: Validate ownerId

    const newBus = new Bus({
      busNumber,
      busModel,
      capacity,
      owner,
    });

    await newBus.save();

    res.status(201).json(newBus);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating bus", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const bus = await Bus.findById(id).populate("trips");
    res.status(200).json(bus);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieve bus", error: error.message });
  }
});

export default router;
