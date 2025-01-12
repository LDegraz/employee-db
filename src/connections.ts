import { Client } from 'pg';

// Create a new client instance
const client = new Client({
    connectionString: 'postgresql://username:password@localhost:5432/your_database_name',
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