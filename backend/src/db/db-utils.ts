import { MongoClient, Db, Collection } from 'mongodb';

// MongoDB connection URI
const mongoUri = process.env.MONGO_URL || 'mongodb://localhost:27017';

// Initialize MongoDB client
let db: Db;

// Function to connect to MongoDB and get the database
async function connectToDb(): Promise<Db> {
    if (!db) {
        const client = new MongoClient(mongoUri);
        await client.connect();
        db = client.db('mydatabase');
        console.log('Connected to MongoDB');
    }
    return db;
}

export default connectToDb;
