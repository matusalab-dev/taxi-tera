import mongoose from "mongoose";
import { TaxiStand } from "../models/taxiStand.js";
import { validateTaxiStand } from "../middleware/valiadate.js";

export const addTaxiStand = async (req, res, next) => {
  try {
    validateTaxiStand(req.body);
    const taxiStand = new TaxiStand(req.body);
    await taxiStand.save();
    res.status(201).json(taxiStand);
  } catch (error) {
    next(error);
  }
};

export const getTaxiStands = async (req, res, next) => {
  try {
    const { name, rating, near, radius = 10000, page = 1, limit = 10 } = req.query;

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
          $centerSphere: [[longitude, latitude], radius / 6378.1], // radius in radians
        },
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
    next(error);
  }
};

export const updateTaxiStand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const taxiStand = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No taxi stand with id: ${id}`);
    }

    validateTaxiStand(taxiStand);

    const updatedTaxiStand = await TaxiStand.findByIdAndUpdate(id, taxiStand, { new: true });
    res.status(200).json(updatedTaxiStand);
  } catch (error) {
    next(error);
  }
};

export const deleteTaxiStand = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No taxi stand with id: ${id}`);
    }

    await TaxiStand.findByIdAndDelete(id);
    res.json({ message: "Taxi stand deleted successfully." });
  } catch (error) {
    next(error);
  }
};

export const getNearbyTaxiStands = async (req, res, next) => {
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
    next(error);
  }
};

export const searchTaxiStand = async (req, res, next) => {
  try {
    const { name, address } = req.query;
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
    next(error);
  }
};

export const rateTaxiStand = async (req, res, next) => {
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
    next(error);
  }
};

export const getTaxiStandById = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No taxi stand with id: ${id}`);
    }

    const taxiStand = await TaxiStand.findById(id);
    if (!taxiStand) {
      return res.status(404).json({ message: "Taxi stand not found." });
    }

    res.status(200).json(taxiStand);
  } catch (error) {
    next(error);
  }
};

