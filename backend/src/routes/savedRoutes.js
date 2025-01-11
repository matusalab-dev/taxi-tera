import express from 'express';
import { deleteSavedRoute, getSavedRoutes, saveRoute } from '../controller/savedRoutesController.js';
import { verifyToken } from '../middleware/verify.js';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: SavedRoutes
 *   description: API for managing user-saved routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SavedRoute:
 *       type: object
 *       required:
 *         - user
 *         - name
 *       properties:
 *         user:
 *           type: string
 *           description: ID of the user who saved the route
 *         name:
 *           type: string
 *           description: Name of the saved route
 *         taxiStands:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of taxi stand IDs included in the route
 *       example:
 *         user: "60c72b2f4f1a2c001c9e99b1"
 *         name: "Daily Commute"
 *         taxiStands: ["60d5f9e0e6b1a7b35a27a1c5", "60d5f9e0e6b1a7b35a27a1c6"]
 */

/**
 * @swagger
 * /savedRoutes:
 *   post:
 *     summary: Save a new route for a user
 *     tags: [SavedRoutes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SavedRoute'
 *     responses:
 *       201:
 *         description: Route saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SavedRoute'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /savedRoutes:
 *   get:
 *     summary: Retrieve all saved routes for the current user
 *     tags: [SavedRoutes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of saved routes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SavedRoute'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /savedRoutes/{id}:
 *   delete:
 *     summary: Delete a saved route by ID
 *     tags: [SavedRoutes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the saved route to delete
 *     responses:
 *       200:
 *         description: Route deleted successfully
 *       404:
 *         description: Route not found
 *       500:
 *         description: Internal server error
 */

 router.post('/savedRoutes', verifyToken, saveRoute);
 router.get('/savedRoutes', verifyToken, getSavedRoutes);
 
 router.delete('/savedRoutes/:id',verifyToken, deleteSavedRoute);

 export default router;