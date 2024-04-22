const {Client} = require('pg');

const client = new Client( process.env.DATABASE_URL || "postgres://angeladell:root@localhost:5432/roboquest");

module.exports = client;