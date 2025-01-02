import express from 'express';
import { addTaxiStand, deleteTaxiStand, getNearbyTaxiStands, getTaxiStands, updateTaxiStand } from '../controller/taxiStandController.js';
import { uploadFile, upload } from '../controller/fileUploadController.js';

const router = express.Router();

router.get('/taxiStands', getTaxiStands);
router.post('/taxiStand', addTaxiStand);
router.patch('/taxiStand/:id', updateTaxiStand);
router.delete('/taxiStand/:id', deleteTaxiStand);
router.get('/nearby', getNearbyTaxiStands);

router.post('/upload', upload.single('file'), uploadFile);

export default router;
