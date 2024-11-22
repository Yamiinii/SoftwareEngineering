const { Client } = require('pg');
const mongoose = require('mongoose');

const connectPostgres = async () => {
  const client = new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });

  try {
    await client.connect();
    console.log('PostgreSQL connected');
  } catch (err) {
    console.error('Error connecting to PostgreSQL:', err);
  }
};

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

module.exports = { connectPostgres, connectMongoDB };
