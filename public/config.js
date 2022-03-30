//database config.js
var mysql = require('mysql');
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
   user: 'USERNAME',
   password: 'PASSWORD',
   host: 'localhost', // You can use 'localhost\\instance' to connect to named instance
   database: 'DATABASE_NAME',
   port: 3306
}
logger.debug(JSON.stringify(db_config));

var pool;

function handleDisconnect() {
    pool = mysql.createPool(db_config);
    return pool;
}

pool = handleDisconnect();
module.exports.config = pool;
