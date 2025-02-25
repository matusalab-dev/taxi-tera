import express from 'express';
import { addTaxiStand, deleteTaxiStand, getNearbyTaxiStands, getTaxiStandById, getTaxiStands, rateTaxiStand, searchTaxiStand, updateTaxiStand } from '../controller/taxiStandController.js';
import { uploadFile, upload } from '../controller/fileUploadController.js';
import { authorizeRoles, verifyToken } from '../middleware/verify.js';


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Taxi Stands
 *   description: API to manage taxi stands
 */

/**
 * @swagger
 * /taxiStands:
 *   get:
 *     summary: Get all taxi stands
 *     tags: [Taxi Stands]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Name of the taxi stand
 *       - in: query
 *         name: rating
 *         schema:
 *           type: number
 *         description: Minimum rating of the taxi stand
 *       - in: query
 *         name: near
 *         schema:
 *           type: string
 *         description: Coordinates to search nearby taxi stands (longitude,latitude)
 *       - in: query
 *         name: radius
 *         schema:
 *           type: number
 *         description: Radius to search nearby taxi stands
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: A list of taxi stands
 *       500:
 *         description: Failed to fetch taxi stands
 */
router.get('/taxiStands', getTaxiStands);

/**
 * @swagger
 * /taxiStand:
 *   post:
 *     summary: Add a new taxi stand
 *     tags: [Taxi Stands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaxiStand'
 *     responses:
 *       201:
 *         description: Taxi stand created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/taxiStand',verifyToken,authorizeRoles("admin"), addTaxiStand);

/**
 * @swagger
 * /taxiStand/{id}:
 *   patch:
 *     summary: Update a taxi stand
 *     tags: [Taxi Stands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the taxi stand to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaxiStand'
 *     responses:
 *       200:
 *         description: Taxi stand updated successfully
 *       404:
 *         description: Taxi stand not found
 */
router.patch('/taxiStand/:id', verifyToken,authorizeRoles("admin"), updateTaxiStand);

/**
 * @swagger
 * /taxiStand/{id}:
 *   delete:
 *     summary: Delete a taxi stand
 *     tags: [Taxi Stands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the taxi stand to delete
 *     responses:
 *       200:
 *         description: Taxi stand deleted successfully
 *       404:
 *         description: Taxi stand not found
 */
router.delete('/taxiStand/:id',verifyToken, authorizeRoles("admin"), deleteTaxiStand);


/**
 * @swagger
 * /nearby:
 *   get:
 *     summary: Get nearby taxi stands
 *     tags: [Taxi Stands]
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         schema:
 *           type: number
 *         description: Latitude
 *       - in: query
 *         name: lng
 *         required: true
 *         schema:
 *           type: number
 *         description: Longitude
 *     responses:
 *       200:
 *         description: A list of nearby taxi stands
 *       400:
 *         description: Latitude and longitude are required
 *       500:
 *         description: Server error
 */
router.get('/nearby', getNearbyTaxiStands);

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search taxi stands
 *     tags: [Taxi Stands]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Name of the taxi stand
 *       - in: query
 *         name: address
 *         schema:
 *           type: string
 *         description: Address of the taxi stand
 *     responses:
 *       200:
 *         description: A list of taxi stands matching the search criteria
 *       500:
 *         description: Error during search
 */
router.get('/search', searchTaxiStand);

/**
 * @swagger
 * /rate/{id}:
 *   post:
 *     summary: Rate a taxi stand
 *     tags: [Taxi Stands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the taxi stand to rate
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 description: Rating value between 0 and 5
 *     responses:
 *       200:
 *         description: Rating added successfully
 *       400:
 *         description: Invalid rating value
 *       404:
 *         description: Taxi stand not found
 *       500:
 *         description: Internal server error
 */
router.post('/rate/:id',verifyToken, rateTaxiStand);

/**
 * @swagger
 * /taxiStand/{id}:
 *   get:
 *     summary: Retrieve a taxi stand by its ID
 *     tags: [Taxi Stands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the taxi stand
 *     responses:
 *       200:
 *         description: The details of the taxi stand
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaxiStand'
 *       404:
 *         description: Taxi stand not found or invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Taxi stand not found.
 *       500:
 *         description: Internal server error
 */
router.get('/taxiStand/:id', getTaxiStandById );

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload a CSV file to bulk add taxi stands
 *     tags: [Taxi Stands]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The CSV file containing taxi stand data
 *     responses:
 *       201:
 *         description: Taxi stands successfully created from the file
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TaxiStand'
 *       400:
 *         description: No file uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No file uploaded
 *       500:
 *         description: Internal server error
 */
router.post('/upload',verifyToken, authorizeRoles("admin"), upload.single('file'), uploadFile);

export default router;
