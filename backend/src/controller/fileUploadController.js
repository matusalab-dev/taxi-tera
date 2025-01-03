import { TaxiStand } from "../models/taxiStand.js";
import csv from "csvtojson";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.resolve('src/uploads');
    // Ensure directory exists
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Create the upload middleware
const upload = multer({ storage });

export const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Use path.resolve to ensure the correct file path
  const filePath = path.resolve('src/uploads', req.file.filename);

  try {
    // Convert CSV to JSON
    const jsonArray = await csv().fromFile(filePath);

    // Transform data to match the model's schema
    const transformedData = jsonArray.map(item => ({
      name: item.name,
      description: item.description,
      location: {
        type: "Point",
        coordinates: [Number(item['location.coordinates.0']), Number(item['location.coordinates.1'])],
      },
      address: item.address,
      operationalHours: {
        Monday: item['operationalHours.Monday'],
        Tuesday: item['operationalHours.Tuesday']
      },
      rating: {
        average: Number(item['rating.average']),
        count: Number(item['rating.count']),
      },
    }));

    const taxiStands = await TaxiStand.insertMany(transformedData);

    res.status(201).json(taxiStands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { upload };
