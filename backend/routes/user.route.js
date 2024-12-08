import express from "express";
import BusSchema from "../models/bus.schema.js";
import User from "../models/user.schema.js";

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

router.patch("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const updates = req.body;

        if (!updates || Object.keys(updates).length === 0) {
            return res.status(400).json({ message: "No fields to update" });
        }

        const allowedFields = ["fullName", "profilePictureUrl", 'phone', 'dob', 'gender', 'status'];
        const fieldsToUpdate = Object.keys(updates).filter((field) =>
            allowedFields.includes(field),
        );

        if (fieldsToUpdate.length === 0) {
            return res.status(400).json({ message: "No valid fields to update" });
        }

        const validUpdates = fieldsToUpdate.reduce((acc, field) => {
            acc[field] = updates[field];
            return acc;
        }, {});

        const updatedUser = await User.findByIdAndUpdate(userId, validUpdates, {
            new: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error updating profile",
            error: error.message,
        });
    }
});

router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const userInfo = await User.findById(userId);
        res.status(200).json(userInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error get info profile",
            error: error.message,
        });
    }
});
router.get("/", async (req, res) => {
    try {
        const { keyword, roles, page = "1", limit = "10" } = req.query;
        let query = {};
        if (keyword) {
            query.$or = [
                { fullName: { $regex: `.*${keyword}.*`, $options: "i" } },
                { email: { $regex: `.*${keyword}.*`, $options: "i" } },
                { phone: { $regex: `.*${keyword}.*`, $options: "i" } },
            ];
        }
        if (roles) {
            query.roles = roles;
        }
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        const total = await User.countDocuments(query);
        const users = await User.find(query)
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);

        const pagination = {
            total,
            pages: Math.ceil(total / limitNumber),
            pageSize: limitNumber,
            current: pageNumber,
        };

        res.status(200).json({ users, pagination });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error get all users",
            error: error.message,
        });
    }
});
export default router;
