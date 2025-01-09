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
        const { name, rating, near, radius = 5000, page = 1, limit = 10 } = req.query;
    
        let query = {};
   
        if (name) {
          query.name = { $regex: name, $options: "i" };
        }

        if (rating) {
          query["rating.average"] = { $gte: parseFloat(rating) };
        }

        if (near) {
          const [longitude, latitude] = near.split(",").map(Number);
          query.location = {
            $geoWithin: {
              $centerSphere: [[longitude, latitude], radius / 6378.1] // radius in radians
            }
          };
        }

        const skip = (page - 1) * limit;
    
        const taxiStands = await TaxiStand.find(query)
          .skip(skip)
          .limit(parseInt(limit));
          
        const total = await TaxiStand.countDocuments(query);
    
        res.status(200).json({
          data: taxiStands,
          total,
          page: parseInt(page),
          pages: Math.ceil(total / limit),
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch taxi stands." });
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

export const searchTaxiStand = async (req, res) => {
  const { name, address } = req.query;

  try {
    const filter = {};
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }
    if (address) {
      filter.address = { $regex: address, $options: "i" };
    }

    const results = await TaxiStand.find(filter);
    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ message: "Error during search", error });
  }
};

export const rateTaxiStand = async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;

  if (!rating || rating < 0 || rating > 5) {
    return res.status(400).json({ error: "Rating must be a number between 0 and 5." });
  }

  try {
    const taxiStand = await TaxiStand.findById(id);
    if (!taxiStand) {
      return res.status(404).json({ error: "Taxi stand not found." });
    }

    
    const totalRating = taxiStand.rating.average * taxiStand.rating.count + rating;
    taxiStand.rating.count += 1;
    taxiStand.rating.average = totalRating / taxiStand.rating.count;

    const updatedTaxiStand = await taxiStand.save();

    res.status(200).json({
      message: "Rating added successfully.",
      data: updatedTaxiStand,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

