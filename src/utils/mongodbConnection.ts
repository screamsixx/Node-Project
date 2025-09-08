import { MongoClient, Db } from 'mongodb';
import 'dotenv/config';

// Define the MongoDB connection URI from environment variables
const uri: string = process.env.MONGODB_URI || '';

let client: MongoClient;
let db: Db;

// Function to establish and maintain a single database connection
export const connectToDatabase = async (): Promise<Db> => {
    // Return the existing database connection if it's already established
    if (db) {
        return db;
    }

    // Check for the connection URI
    if (!uri) {
        throw new Error('MONGODB_URI not defined in environment variables');
    }

    try {
        // Create a new MongoClient instance
        client = new MongoClient(uri);

        // Connect to the MongoDB server
        await client.connect();
        
        // Select the database
        db = client.db(process.env.MONGODB_DB_NAME);
        
        console.log('Successfully connected to MongoDB!');
        return db;
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }
};

// Function to close the database connection
export const closeConnection = async (): Promise<void> => {
    if (client) {
        await client.close();
        console.log('MongoDB connection closed.');
    }
};