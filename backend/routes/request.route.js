import express from "express";
import { RequestActionConstant } from "../constants/requestAction.constant.js";
import { Role } from "../constants/role.constant.js";
import Request from "../models/request.schema.js";
import User from "../models/user.schema.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { isResolved = false, page = "1", limit = "10" } = req.query;

        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        let query = {};
        if (isResolved !== undefined) {
            query.isResolved = isResolved === "true";
        }

        const total = await Request.countDocuments(query);
        const requests = await Request.find(query).populate({
            path: "targetId",
            model: "User"
        }).skip((pageNumber - 1) * limitNumber).limit(limitNumber);

        const formattedRequests = requests.map((request) => ({
            ...request.toObject(),
            user: request.targetId,
        }));
        const pagination = {
            total,
            pages: Math.ceil(total / limitNumber),
            pageSize: limitNumber,
            current: pageNumber,
        };
        res.status(200).json({ requests: formattedRequests, pagination });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "Error fetching requests", error: error.message });
    }
});

router.patch("/:requestId", async (req, res) => {
    try {
        const { requestId } = req.params;
        const { isApprove } = req.body;

        // Tìm request theo ID
        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        if (request.actionNeeded === RequestActionConstant.BUS_OWNER_APPROVAL) {
            const user = await User.findById(request.targetId);
            if (!user) {
                return res
                    .status(404)
                    .json({ message: "User not found for this request" });
            }

            if (isApprove) {
                user.isRequestBusOwner = false;
            } else {
                user.isRequestBusOwner = false;
                const idx = user.roles.indexOf(Role.BUS_OWNER);
                if (idx !== -1) {
                    user.roles.splice(idx, 1);
                }
            }

            await user.save();
        }

        request.isResolved = true;
        await request.save();

        res.status(200).json({
            message: isApprove ? "Request approved" : "Request rejected",
            request,
        });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "Error updating request", error: error.message });
    }
});

export default router;
