import mongoose from "mongoose";
import { BusTripStatusConstant } from "../constants/busTripStatus.constant.js";

const BusTripSchema = new mongoose.Schema({
    bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
        type: String,
        required: true,
        enum: Object.values(BusTripStatusConstant),
    },
    origin: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true },
    destination: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    price: { type: Number, required: true },
    amenity: [{ type: String, required: false }],
    policy: { type: String, required: false },
    ticketBooked: [{ type: Number, required: false }],
    paymentMethods: [{ type: String, required: false }],
});

export default mongoose.model("BusTrip", BusTripSchema);
