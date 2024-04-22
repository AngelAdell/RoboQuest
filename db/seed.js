const client = require('./index.js');
const bcrypt = require('bcrypt');
const faker = require('faker');


const dropTables = async () => {
  try {
    await client.query
    (`DROP TABLE IF EXISTS robots;
    DROP TABLE IF EXISTS users;
    `)
console.log('Tables dropped successfully');
  } catch (error) {
    console.error('Error dropping tables:', error);
  }
};

  const createTables = async () => {
    try {
      await client.query
      (`CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
      CREATE TABLE robots (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        color VARCHAR(255) NOT NULL,
        user_id INTEGER REFERENCES users(id)
      );
      `);
      console.log('Tables created successfully');
    } catch (error) {
      console.error('Error creating tables:', error);
    }
  };

const createUsers = async () => {
  try {

    const insertQuery = `INSERT INTO users (username, password) VALUES ($1, $2)`;

    for (let i = 0; i < 4; i++) {
      const username = faker.internet.userName();
      const password = await bcrypt.hash('password', 10);
      await client.query(insertQuery, [username, password]);
    }
    console.log('Users created successfully');
  }catch (error) {
    console.error('Error creating users:', error);
  }
};


const createRobots = async () => {
  try {
    const insertRobots = `INSERT INTO robots (name, color, user_id) VALUES ($1, $2, $3)`;
    for (let i = 0; i < 4; i++) {
      const robots = faker.random.name();
      const colors = faker.commerce.color();
      await client.query(insertRobots, [robots, colors, i + 1]);
    }
    console.log('Robots created successfully');
  } catch (error) {
    console.error('Error creating robots:', error);
  }
};


  const seedSync = async () => {
    try {
      await client.connect();
      console.log('Connected to database');
  
      await dropTables();
      console.log('Dropped tables');

      await createTables();
      console.log('Created tables');

      await createUsers();
      console.log('Created users');

      await createRobots();
      console.log('Created robots');
  
      await client.end();
      console.log('Closed connection to database');

    } catch (error) {
      console.error('Error seeding database:', error);
    }
  };
  
  seedSync();