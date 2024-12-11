import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, },
    phone: { type: String, required: true, },
    email: { type: String, required: true, },
    bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: Number, required: true, },
    reason: { type: String, required: false },
    seats: [{ type: Number, required: false }],
    price: { type: Number, required: false },
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: "BusTrip", required: true },
    paymentMethod: { type: String, required: false },
});

export default mongoose.model("Ticket", TicketSchema);
