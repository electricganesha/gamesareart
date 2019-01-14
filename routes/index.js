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

  /* GET home page. */
  app.get('/admin', function (req, res, next) {
    res.render('admin/index', {
      title: 'Games Are Art'
    });
  });

  // show the login form
  app.get('/admin/login', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render('admin/login', {
      message: req.flash('loginMessage')
    });
  });

  // show the signup form
  app.get('/admin/signup', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render('admin/signup', {
      message: req.flash('signupMessage')
    });
  });
}
