const express = require('express');
const client = require('../db/index');
const usersRouter = require('./users');
const robotsRouter = express.Router();

usersRouter.get('/', async (req, res) => {
  res.send('Welcome to the robots route!');
  console.log('Welcome to the robots route!');
});

robotsRouter.post('/id', async (req, res) => {
  try {
    const { rows } = await client.query('SELECT * FROM robots WHERE id = $1;', [req.params.id]);
    res.json(rows[0]);
  }
  catch (error) {
    console.error('Error getting robot:', error);
  }
});