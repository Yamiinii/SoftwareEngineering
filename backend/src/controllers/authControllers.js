const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerUser, getUserByUsername } = require('../models/User');

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await registerUser(username, password);
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in' });
  }
};

module.exports = { register, login };
