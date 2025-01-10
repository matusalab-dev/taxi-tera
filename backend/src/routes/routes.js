import express from 'express';
import taxiStandRouttes from './taxiStandRoutes.js';
import authRoute from './authRoutes.js';
// import savedRouttes from './savedRoutes.js';

const router = express.Router();

router.use('/', taxiStandRouttes);
router.use('/auth', authRoute);
// router.use('/', savedRouttes)

export default router;