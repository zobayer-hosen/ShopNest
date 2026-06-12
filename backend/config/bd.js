const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');

        // Create a test collection and insert a document to ensure the database is initialized and visible in Compass
        const db = mongoose.connection.db;
        const collections = await db.listCollections({ name: 'test_connection' }).toArray();
        if (collections.length === 0) {
            await db.collection('test_connection').insertOne({ 
                message: 'Database connection verified! Feel free to delete this collection.',
                createdAt: new Date()
            });
            console.log('Test document inserted to initialize the database in MongoDB Compass/Atlas.');
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;