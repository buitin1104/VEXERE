import mongoose from "mongoose";
import { BusTripStatusConstant } from "../constants/busTripStatus.constant.js";

const BusTripSchema = new mongoose.Schema({
  // TODO: Change String type to ObjectId, ref to user later
  assignedToUser: { type: String },
  bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  origin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  price: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    enum: Object.values(BusTripStatusConstant),
  },
  // TODO: Change String type to ObjectId, ref to ticket later
  bookedTickets: { type: [String], default: [] },
});

export default mongoose.model("BusTrip", BusTripSchema);
