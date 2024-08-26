import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { default as dbRouter } from './routes/world-route';

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Add routes
app.use('/db', dbRouter);

// Root endpoint
app.get('/', (req: Request, res: Response) => {
    res.send('Simple TypeScript backend setup');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
