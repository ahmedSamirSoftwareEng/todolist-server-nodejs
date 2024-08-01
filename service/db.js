const mysql = require('mysql2/promise');
const config = require('../config');

// connect my db

const query = async (sql, params) =>{
    try {
        const connection = await mysql.createConnection(config.db);
        console.log('connection successed');
        const [results] = await connection.execute(sql, params);
        return results;
    } catch (error) {
        console.log('connection failed');
    }
}

module.exports = {query}