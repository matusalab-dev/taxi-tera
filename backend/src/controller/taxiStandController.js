import mongoose from "mongoose";
import { TaxiStand } from "../models/taxiStand.js";

export const addTaxiStand = async (req, res) => {
  try {
    const taxiStand = new TaxiStand(req.body);
    await taxiStand.save();
    res.status(201).json(taxiStand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTaxiStands = async (req, res) => {
  try {
    const taxiStands = await TaxiStand.find();
    res.status(200).json(taxiStands);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateTaxiStand = async (req, res) => {
  const { id } = req.params;
  const taxiStand = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No taxi stand with id: ${id}`);
  }
  const updatedTaxiStand = await TaxiStand.findByIdAndUpdate(id, taxiStand, { new: true });
  res.status(200).json(updatedTaxiStand);
};

export const deleteTaxiStand = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No taxi stand with id: ${id}`);
  }
  await TaxiStand.findByIdAndDelete(id);
  res.json({ message: "Taxi stand deleted successfully." });
};

export const getNearbyTaxiStands = async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: "Latitude and longitude are required." });
  }

  try {
    const nearbyStands = await TaxiStand.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: 2000,
        },
      },
    });

    res.status(200).json(nearbyStands);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};
