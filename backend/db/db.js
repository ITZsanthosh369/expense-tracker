const mongoose = require('mongoose');

// Serverless-friendly DB connection helper: reuse existing connections
// between invocations to avoid hitting MongoDB connection limits.
const db = async () => {
    try {
        mongoose.set('strictQuery', false);

        // If already connected, reuse the connection
        if (mongoose.connection && mongoose.connection.readyState === 1) {
            // 1 = connected
            // console.log('Using existing DB connection');
            return;
        }

        await mongoose.connect(process.env.MONGO_URL);
        console.log('Db Connected');
    } catch (error) {
        console.error('DB Connection Error', error);
        throw error;
    }
};

module.exports = { db };
