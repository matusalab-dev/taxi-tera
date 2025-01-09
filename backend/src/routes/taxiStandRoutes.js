import express from 'express';

import { addTaxiStand, deleteTaxiStand, getNearbyTaxiStands, getTaxiStands, rateTaxiStand, searchTaxiStand, updateTaxiStand } from '../controller/taxiStandController.js';

import { uploadFile, upload } from '../controller/fileUploadController.js';


const router = express.Router();

/**
 * @swagger
 * /taxiStands:
 *   get:
 *     summary: Get all taxi stands
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
router.post('/taxiStand', addTaxiStand);

/**
 * @swagger
 * /taxiStand/{id}:
 *   patch:
 *     summary: Update a taxi stand
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
router.patch('/taxiStand/:id', updateTaxiStand);

/**
 * @swagger
 * /taxiStand/{id}:
 *   delete:
 *     summary: Delete a taxi stand
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
router.delete('/taxiStand/:id', deleteTaxiStand);


/**
 * @swagger
 * /nearby:
 *   get:
 *     summary: Get nearby taxi stands
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
router.post('/rate/:id', rateTaxiStand);
router.post('/upload', upload.single('file'), uploadFile);

export default router;
