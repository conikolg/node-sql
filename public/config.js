//database config.js
require('dotenv').config()
var mysql = require('mysql');
var app = require('express');

// Logging
var winston = require('winston');
const consoleTransport = new winston.transports.Console()
const myWinstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)

//You can configure any DB here.
var db_config = {
   user: 'USERNAME',
   password: 'PASSWORD',
   host: 'localhost', // You can use 'localhost\\instance' to connect to named instance
   database: 'DATABASE_NAME',
   port: 3306
}
logger.debug(db_config);

var pool;

function handleDisconnect() {
    pool = mysql.createPool(db_config);
    return pool;
}

pool = handleDisconnect();
module.exports.config = pool;
