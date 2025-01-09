import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     TaxiStand:
 *       type: object
 *       required:
 *         - name
 *         - location
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the taxi stand
 *         description:
 *           type: string
 *           description: Description of the taxi stand
 *         location:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *               enum: ["Point"]
 *             coordinates:
 *               type: array
 *               items:
 *                 type: number
 *               description: Coordinates [longitude, latitude]
 *         address:
 *           type: string
 *           description: Address of the taxi stand
 *         operationalHours:
 *           type: object
 *           additionalProperties:
 *             type: string
 *           description: Operational hours of the taxi stand
 *         rating:
 *           type: object
 *           properties:
 *             average:
 *               type: number
 *               description: Average rating
 *             count:
 *               type: number
 *               description: Number of ratings
 */

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
  },
  operationalHours: {
    type: Map,
    of: String,
    default: {},
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
}, {
  timestamps: true,
});
taxiStandSchema.index({ location: "2dsphere" });

export const TaxiStand = mongoose.model("TaxiStand", taxiStandSchema);
