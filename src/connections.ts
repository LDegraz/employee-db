import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Create a new client instance
const client = new Client({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
});

// Function to connect to the database
const connectDB = async () => {
    try {
        await client.connect();
        console.log('Database connected successfully!');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit the process with failure
    }
};

// Export the client and the connect function
export { client, connectDB };