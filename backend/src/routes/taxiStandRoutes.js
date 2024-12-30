import express from 'express';
import { addTaxiStand, deleteTaxiStand, getTaxiStands, updateTaxiStand } from '../controller/taxiStandController.js';

const router = express.Router();

router.get('/taxiStands', getTaxiStands);
router.post('/taxiStand', addTaxiStand);
router.patch('/taxiStand/:id', updateTaxiStand);
router.delete('/taxiStand/:id', deleteTaxiStand);

export default router;