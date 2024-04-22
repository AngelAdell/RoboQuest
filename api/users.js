const express = require('express');
const bcrypt = require('bcrypt');
const usersRouter = express.Router();
const client = require('../db/index');
const jwt = require('jsonwebtoken');


const signInToken = (user, password) => {
  return jwt.sign({ user, password }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1w' });
};

usersRouter.get('/', async (req, res) => {
  res.send('Welcome to the users route!');
});

usersRouter.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.passsword;    
    try {
      const { rows } = await client.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username;',
        [username, hashedPassword]
      );
      const token = signInToken(rows[0].id); 
      res.json({ user: rows[0], token });
    }
    catch (error) {
      console.error('Error signing up:', error);
    }
  });

usersRouter.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const { rows } = await client.query(
      'SELECT id, username, password FROM users WHERE username = $1;',
      [username]
    );
    const user = rows[0];
    if (user && await bcrypt.compare(password, user.password)) {
      const token = signInToken(user.id); // Generate token using user ID
      res.json({ token });
      console.log('User logged in successfully');
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
  }
});



module.exports = usersRouter;
