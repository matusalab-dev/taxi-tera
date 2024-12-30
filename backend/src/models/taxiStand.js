import mongoose from "mongoose";


const taxiStandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function (coords) {
          return coords.length === 2;
        },
        message: "Coordinates must have exactly two values: [longitude, latitude]",
      },
    },
  },
  address: {
    type: String,
  }
}, {
  timestamps: true,
});
taxiStandSchema.index({ location: "2dsphere" });

export const TaxiStand = mongoose.model("TaxiStand", taxiStandSchema);
