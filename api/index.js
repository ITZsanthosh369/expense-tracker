const app = require('../backend/app');
const { db } = require('../backend/db/db');

// Initialize DB once per cold start
db().catch((err) => console.error('DB init error:', err));

// Export the Express app directly for Vercel
module.exports = app;
