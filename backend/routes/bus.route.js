import express from "express";
import Bus from "../models/bus.schema.js";
import Ticket from "../models/ticket.schema.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { busNumber, busModel, owner, gallery } = req.body;

        // TODO: Validate ownerId
        const newBus = new Bus({
            busNumber,
            busModel,
            owner,
            gallery,
        });
        await newBus.save();
        res.status(201).json(newBus);
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error creating bus", error: error.message });
    }
});
router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!updates || Object.keys(updates).length === 0) {
            return res.status(400).json({ message: "Không có thông tin cập nhật" });
        }

        const bus = await Bus.findByIdAndUpdate(id, updates, {
            new: true,
        });

        if (!bus) {
            return res.status(404).json({ message: "Không tìm thấy xe" });
        }

        res.status(200).json(bus);
    } catch (error) {
        res
            .status(500)
            .json({ message: "Lỗi xảy ra", error: error.message });
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

router.get("/admin/buses", async (req, res) => {
    try {
        const { keyword, ownerId, page = "1", limit = "10" } = req.query;
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        let query = {};
        if (ownerId) {
            query.owner = ownerId;
        }
        if (keyword) {
            query.busNumber = { $regex: `.*${keyword}.*`, $options: "i" };
        }
        const total = await Bus.find(query).countDocuments();
        const buses = await Bus.find(query)
            .populate("owner")
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
            message: "Error retrieving buses for owner",
            error: error.message,
        });
    }
});

router.get("/:id/reviews", async (req, res) => {
    try {
        const { id } = req.params;
        const { page = "1", limit = "20" } = req.query;
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        const query = {
            bus: id,
            status: 4,
        };

        const total = await Ticket.countDocuments(query);
        const tickets = await Ticket.find(query)
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber)
            .populate("userId");

        const averageStar = tickets.reduce((acc, ticket) => acc + ticket.star, 0) / tickets.length;

        const pagination = {
            total,
            pages: Math.ceil(total / limitNumber),
            pageSize: limitNumber,
            current: pageNumber,
        };

        res.status(200).json({ reviews: tickets, pagination, averageStar });
    } catch (error) {
        res.status(500).json({
            message: "Error get all ticket of bus",
            error: error.message,
        });
    }
});
export default router;
