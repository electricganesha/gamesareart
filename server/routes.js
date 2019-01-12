var express = require('express'),
	passport = require('passport'),
	apiRouter = express.Router(),
	router = express.Router();

module.exports = function (app) {
	app.use('/api', apiRouter);
	app.use('/', router);

	// API routes
	require('./api/games')(apiRouter);

	//POST Register New User (optional, everyone has access)
	router.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/admin/dashboard', // redirect to the secure dashboard section
		failureRedirect: '/admin/signup', // redirect back to the signup page if there is an error
		failureFlash: true // allow flash messages
	}));

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/admin/dashboard', // redirect to the secure dashboard section
		failureRedirect: '/admin/login', // redirect back to the signup page if there is an error
		failureFlash: true // allow flash messages
	}));

	app.get('/admin/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/admin/dashboard', isLoggedIn, function (req, res) {
		res.render('admin/dashboard', {
			user: req.user // get the user out of session and pass to template
		});
	});

	// route middleware to make sure a user is logged in
	function isLoggedIn(req, res, next) {

		// if user is authenticated in the session, carry on 
		if (req.isAuthenticated())
			return next();

		// if they aren't redirect them to the home page
		res.redirect('/');
	}
};