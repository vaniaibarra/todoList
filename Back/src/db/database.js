const { Pool } = require('pg');
require('dotenv').config();

const isTest = process.env.NODE_ENV === 'test';

const dbName = isTest ? process.env.DB_NAME_TEST : process.env.DB_NAME;

const poolConfig = process.env.DATABASE_URL
?{
    connectionString: process.env.DATABASE_URL,
    /* ssl: {
        rejectunauthorized: false
    }
     */
} : {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: dbName,
    port: process.env.DB_PORT,
    allowExitOnIdle: true
}

const pool = new Pool(poolConfig);

module.exports = { pool };