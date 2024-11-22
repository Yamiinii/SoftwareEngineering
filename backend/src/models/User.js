const { Client } = require('pg');
const bcrypt = require('bcryptjs');

const client = new Client();

const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) NOT NULL,
      password VARCHAR(100) NOT NULL
    )
  `;
  await client.query(query);
};

const registerUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING id, username
  `;
  const result = await client.query(query, [username, hashedPassword]);
  return result.rows[0];
};

const getUserByUsername = async (username) => {
  const query = 'SELECT * FROM users WHERE username = $1';
  const result = await client.query(query, [username]);
  return result.rows[0];
};

module.exports = { createUserTable, registerUser, getUserByUsername };
