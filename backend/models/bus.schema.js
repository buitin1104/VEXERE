import mongoose from "mongoose";

const BusSchema = new mongoose.Schema({
  // TODO: Change String type to ObjectId, ref to "User" later
  owner: { type: String, required: true },
  busNumber: { type: String, required: true },
  busModel: { type: String, required: true },
  capacity: { type: Number, required: true },
  trips: [
    { type: mongoose.Schema.Types.ObjectId, ref: "BusTrip", required: true },
  ],
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
});

export default mongoose.model("Bus", BusSchema);
