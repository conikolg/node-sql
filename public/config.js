//database config.js
var mysql = require('mysql2');
var app = require('express');

// Logging
var winston = require('winston');
const loggingFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);
const logger = new winston.createLogger({
    transports: [new winston.transports.Console({ level: 'debug', format: loggingFormat })]
});

//You can configure any DB here.
var db_config = {
    user: process.env.DB_USERNAME || 'USERNAME',
    password: process.env.DB_PASSWORD || 'PASSWORD',
    host: process.env.DB_HOSTNAME || 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: process.env.DB_DATABASE || 'DATABASE_NAME',
    port: process.env.DB_PORT || 3306
}
logger.debug('db config = ' + JSON.stringify(db_config));

var pool;

function handleDisconnect() {
    pool = mysql.createPool(db_config);
    pool.getConnection(function (err, connection) {
        if (err) {
            logger.error('on startup when making db connection  ' + JSON.stringify(err));
            return;
        }
        q = `
            CREATE TABLE IF NOT EXISTS Users(
                ID int NOT NULL AUTO_INCREMENT,
                Name varchar(255),
                Age int,
                City varchar(255),
                PRIMARY KEY (ID)
            );
        `
        connection.query(q, function (err, rows, fields) {
            connection.release();
            if (err)
              logger.error('on startup when creating table  ' + JSON.stringify(err));
          });
    });
    return pool;
}

pool = handleDisconnect();
module.exports.config = pool;
