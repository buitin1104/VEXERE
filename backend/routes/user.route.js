import express from "express";
import BusSchema from "../models/bus.schema.js";

const router = express.Router();

router.get("/:id/buses", async (req, res) => {
  try {
    const { id } = req.params;
    const { page = "1", limit = "10" } = req.query;
    // TODO Validate id (user)

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    let query = {
      owner: id,
    };

    const total = await BusSchema.countDocuments(query);
    const buses = await BusSchema.find(query)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const pagination = {
      total,
      pages: Math.ceil(total / limitNumber),
      pageSize: limitNumber,
      current: pageNumber,
    };

    res.status(200).json({ buses, pagination });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving bus of current owner",
      error: error.message,
    });
  }
});

export default router;
