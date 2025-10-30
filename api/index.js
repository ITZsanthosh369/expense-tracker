const serverless = require('serverless-http');
const app = require('./backend/app');
const { db } = require('./backend/db/db');

// Initialize DB once per cold start. In serverless environments this
// top-level initialization runs on cold start and helps avoid opening
// a new connection on every request.
db().catch((err) => console.error('DB init error (serverless wrapper):', err));

module.exports = serverless(app);
