require('dotenv').config();
import mysql from 'mysql2/promise';

// Establish connection to database
const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,   
    database: process.env.MYSQL_DB,
    waitForConnections: true,
    connectionLimit: 10,   
    queueLimit: 0
});

export default connection;