import mongoose from "mongoose";

const savedRouteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  taxiStands: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaxiStand",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const SavedRoute = mongoose.model("SavedRoute", savedRouteSchema);
