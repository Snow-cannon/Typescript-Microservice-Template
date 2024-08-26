import connectToDb from '../db/db-utils';
import { MongoClient, Db, Collection } from 'mongodb';
import express, { Request, Response, Router } from 'express';
import { isWorld } from '../mongo-type-check';

// Create router
const router: Router = express.Router();

// Endpoint to insert data into MongoDB
router.post('/worlds', async (req: Request, res: Response) => {
    try {
        // Connect to the mongodb database
        const db = await connectToDb();

        // Get desired collection
        const collection: Collection = db.collection('worlds');

        // Get document
        const body = req.body;

        if (!isWorld(body)) {
            return res.status(400).send('Request body is not a world object');
        }

        // Check the document is valid
        if (!body) {
            return res.status(400).send('Request body is missing');
        }

        // Insert data to the database
        const result = await collection.insertOne(req.body);

        // Check the result is valid
        if (result.insertedId) {
            res.status(201).send({
                message: 'Data added successfully',
                insertedId: result.insertedId,
            });
        } else {
            res.status(500).send('Failed to insert data');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// Endpoint to retrieve all data from MongoDB
router.get('/worlds', async (req: Request, res: Response) => {
    try {
        const db = await connectToDb();
        const collection: Collection = db.collection('worlds');

        const data = await collection.find({}).toArray();

        res.status(200).send(data);
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
