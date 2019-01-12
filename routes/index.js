var express = require('express');
var router = express.Router();
var apiRouter = express.Router();

module.exports = function(app){

  /* GET home page. */
  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Games Are Art' });
  });

}
