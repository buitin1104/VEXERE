import mongoose from "mongoose";

const BusSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    busNumber: { type: String, required: true },
    busModel: { type: String, required: true },
    gallery: [{ type: String }],
});

export default mongoose.model("Bus", BusSchema);
