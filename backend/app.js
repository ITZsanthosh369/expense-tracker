const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());

// Configure CORS: allow the deployed frontend, localhost (for development),
// or an explicit FRONTEND_URL from environment. This avoids hard-blocking
// requests from other origins while still allowing your app to function.
const allowedOrigins = [
    process.env.FRONTEND_URL, // optional, set in env when deploying
    'https://expense-tracker-fzdr.vercel.app', // existing deployed frontend
    'http://localhost:3000', // react dev server
    'http://127.0.0.1:3000'
].filter(Boolean);

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        // For debugging, you can change this to `callback(null, true)` to allow all origins.
        return callback(new Error('Not allowed by CORS'));
    },
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
// Enable pre-flight for all routes
app.options('*', cors(corsOptions));

// Dynamically load all routes
readdirSync('./routes').map((routeFile) => {
    const route = require('./routes/' + routeFile);
    app.use('/api/v1', route); // This is where the route is being used
});


const authRoutes = require('./routes/auth');
app.use('/api/v1/auth', authRoutes);  // Separate route for auth

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server only if this module is not being imported
if (require.main === module) {
    db(); // Connect to the database
    app.listen(PORT, () => {
        console.log('Listening on port:', PORT);
    });
}

// Export app for testing
module.exports = app;
