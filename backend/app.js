const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());

// Configure CORS. For deployed serverless usage we reflect the incoming
// origin back to the client so the Access-Control-Allow-Origin header is
// present. This is a safe approach when you control the frontend origin
// via the `FRONTEND_URL` env var; it also prevents missing CORS headers
// that cause preflight failures.
app.use(cors({
    origin: true, // reflect request origin
    credentials: true,
    optionsSuccessStatus: 200
}));

// Ensure OPTIONS preflight requests are handled
app.options('*', cors());

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
