// Logging
const axios = require('axios');
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
api_host = "10.2.29.11"
api_port = "8080"
api_stub = `http://${api_host}:${api_port}/api/`

module.exports = {
  getUsers: function (req, res) {
    axios.get(api_stub + "getUsers")
      .then(function (response) {
        logger.debug("/api/getUsers success: " + JSON.stringify(response.data));
        res.json(response.data);
      })
      .catch(function (error) {
        logger.debug("/api/getUsers failed: " + error);
      });
  },
  addUser: function (req, res) {
    var name = req.body.name;
    var age = req.body.age;
    var city = req.body.city;
    axios.post(api_stub + "addUser", { name, age, city })
      .then(function (response) {
        logger.debug("/api/addUser success");
        res.json(response.data);
      })
      .catch(function (error) {
        logger.debug("/api/addUser failed: " + error);
      });
  },
  updateUser: function (req, res) {
    var name = req.body.name;
    var age = req.body.age;
    var city = req.body.city;
    let id = req.params.id;
    axios.put(api_stub + "updateUser/" + id, { name, age, city })
      .then(function (response) {
        logger.debug("/api/updateUser success");
        res.json(response.data);
      })
      .catch(function (error) {
        logger.debug("/api/updateUser failed: " + error);
      });
  },
  deleteUser: function (req, res) {
    let id = req.params.id;
    axios.delete(api_stub + "deleteUser/" + id, { id })
      .then(function (response) {
        logger.debug("/api/deleteUser success");
        res.json(response.data);
      })
      .catch(function (error) {
        logger.debug("/api/deleteUser failed: " + error);
      });
  }
}
