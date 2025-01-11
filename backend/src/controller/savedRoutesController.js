import { SavedRoute } from "../models/savedRoute.js";
import { TaxiStand } from "../models/taxiStand.js";

export const saveRoute = async (req, res) => {
  const { name, taxiStandIds } = req.body; 
  const userId = req.user.id;

  if (!name || !taxiStandIds || !Array.isArray(taxiStandIds) || taxiStandIds.length === 0) {
    return res.status(400).json({
      message: "Invalid input: 'name' and a non-empty 'taxiStandIds' array are required.",
    });
  }

  try {
    const taxiStands = await TaxiStand.find({ _id: { $in: taxiStandIds } });
    if (taxiStands.length !== taxiStandIds.length) {
      return res.status(404).json({ message: "Some taxi stands not found." });
    }
    const savedRoute = new SavedRoute({ user: userId, name, taxiStands });
    await savedRoute.save();

    res.status(201).json(savedRoute);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSavedRoutes = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const savedRoutes = await SavedRoute.find({ user: userId }).populate("taxiStands");
      res.status(200).json(savedRoutes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const deleteSavedRoute = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedRoute = await SavedRoute.findByIdAndDelete(id);
      if (!deletedRoute) {
        return res.status(404).json({ message: "Saved route not found." });
      }
  
      res.status(200).json({ message: "Route deleted successfully." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    
  };
  