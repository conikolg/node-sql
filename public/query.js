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

// API
var pool = require('./config').config
module.exports = {
  getUsers: function (req, res) {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error('in /getUsers when making db connection   ' + JSON.stringify(err));
        return;
      }
      connection.query('SELECT * from Users', function (err, rows, fields) {
        connection.release();
        if (!err)
          res.json(rows);
        else
          console.log('Error while performing Query.', err);
      });
    });
  },
  addUser: function (req, res) {
    var name = req.body.name;
    var age = req.body.age;
    var city = req.body.city;
    var query = 'Insert into Users (Name, Age, City) values ("' + name + '",' + age + ',"' + city + '")';
    console.log(query);
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error('in /addUser when making db connection   ' + JSON.stringify(err));
        return;
      }
      connection.query(query, function (err, rows, fields) {
        connection.release();
        if (!err)
          res.json(rows);
        else
          console.log('Error while performing Query.', err);
      });
    });
  },
  updateUser: function (req, res) {
    var name = req.body.name;
    var age = req.body.age;
    var city = req.body.city;
    var query = 'Update Users SET Name = "' + name + '", Age = ' + age + ' , City = "' + city + '" where ID = ' + req.params.id + '';
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error('in /updateUser when making db connection   ' + JSON.stringify(err));
        return;
      }
      connection.query(query, function (err, rows, fields) {
        connection.release();
        if (!err)
          res.json(rows);
        else
          console.log('Error while performing Query.', err);
      });
    });
  },
  deleteUser: function (req, res) {
    var query = 'Delete from Users where ID = ' + req.params.id + '';
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error('in /deleteUser when making db connection   ' + JSON.stringify(err));
        return;
      }
      connection.query(query, function (err, rows, fields) {
        connection.release();
        if (!err)
          res.json(rows);
        else
          console.log('Error while performing Query.', err);
      });
    });
  }
}
