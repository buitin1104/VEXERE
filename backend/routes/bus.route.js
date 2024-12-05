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

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!updates) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const updatedBus = await Bus.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedBus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.status(200).json(updatedBus);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating bus", error: error.message });
  }
});

export default router;
