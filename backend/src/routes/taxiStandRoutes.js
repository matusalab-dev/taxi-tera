import express from 'express';
import { addTaxiStand, deleteTaxiStand, getNearbyTaxiStands, getTaxiStands, rateTaxiStand, searchTaxiStand, updateTaxiStand } from '../controller/taxiStandController.js';

const router = express.Router();

router.get('/taxiStands', getTaxiStands);
router.post('/taxiStand', addTaxiStand);
router.patch('/taxiStand/:id', updateTaxiStand);
router.delete('/taxiStand/:id', deleteTaxiStand);
router.get('/nearby', getNearbyTaxiStands)
router.get('/search', searchTaxiStand)
router.post('/rate/:id',rateTaxiStand)

export default router;