import mongoose from "mongoose";

const BusSchema = new mongoose.Schema({
  // TODO: Change String type to ObjectId, ref to user later
  owner: { type: String, required: true },
  busNumber: { type: String, required: true },
  busModel: { type: String, required: true },
  capacity: { type: Number, required: true },
  tripIds: { type: [String], default: [] },
  comments: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Comment", required: true },
  ],
});

export default mongoose.model("Bus", BusSchema);
