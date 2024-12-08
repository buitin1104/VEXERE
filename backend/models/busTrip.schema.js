import mongoose from "mongoose";
import { BusTripStatusConstant } from "../constants/busTripStatus.constant.js";

const BusTripSchema = new mongoose.Schema({
    // TODO: Change String type to ObjectId, ref to user later
    bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
    assignedToUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
        type: String,
        required: true,
        enum: Object.values(BusTripStatusConstant),
    },
    origin: [{ type: String, required: true }],
    destination: [{ type: String, required: true }],
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    price: { type: Number, required: true },
    amenity: [{ type: String, required: false }],
    policy: { type: String, required: false },
    ticket_booked: [{ type: Number, required: false }],
    payment_methods: [{ type: Number, required: false }],
    // bookedTickets: { type: [String], default: [] },
});

export default mongoose.model("BusTrip", BusTripSchema);
