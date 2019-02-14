var express = require('express');
var router = express.Router();
var apiRouter = express.Router();

module.exports = function (app) {

  app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  /* GET home page. */
  app.get('/', function (req, res, next) {
    res.render('website/index', {
      title: 'Games Are Art'
    });
  });
}
