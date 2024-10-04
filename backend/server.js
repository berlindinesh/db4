require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Import and use the route files
const familyInfoRoutes = require('./routes/familyInfo');
const serviceHistoryRoutes = require('./routes/serviceHistory');
const nominationDetailsRoutes = require('./routes/nominationDetails');

// Use the route files
app.use('/api/family-info', familyInfoRoutes);
app.use('/api/service-history', serviceHistoryRoutes);
app.use('/api/nomination-details', nominationDetailsRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});