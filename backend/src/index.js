const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectPostgres, connectMongoDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to databases
connectPostgres();
connectMongoDB();

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
