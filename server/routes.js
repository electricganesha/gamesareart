var express = require('express'),
	passport = require('passport'),
	apiRouter = express.Router(),
	router = express.Router();
const jwt = require('jsonwebtoken');

module.exports = function (app) {
	app.use('/api', apiRouter);
	app.use('/', router);

	// API routes
	require('./api/games')(apiRouter);

	//POST Register New User (optional, everyone has access)
	router.post('/signup', function (req, res, next) {

		// generate the authenticate method and pass the req/res
		passport.authenticate('local-signup', function (err, user, info) {
			if (err) {
				return next(err);
			}
			
			if (!user) {
				res.status(401).send({
					error: info
				})
			}
			else{
				const token = jwt.sign({
					user: user
				}, 'gamesareartartisgames');
				res.json({
					message: 'Signup successful',
					email: user.email,
					name: user.name,
					token: token
				});
			}

		})(req, res, next);

	});

	router.post('/login', passport.authenticate('local-login'), async (req, res, next) => {
		const token = jwt.sign({
			user: req.user
		}, 'gamesareartartisgames');
		res.json({
			message: 'Login successful',
			email: req.user.email,
			name: req.user.name,
			token: token
		});
	});

	router.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

	router.post('/validate', function (req, res) {
		jwt.verify(req.body.token, 'gamesareartartisgames', function (err, decoded) {
			if (err)
				res.status(401).send({
					error: 'JWT token is invalid'
				})
			else {
				res.json({
					message: 'Validate successful',
					email: decoded.user.email,
					name: decoded.user.name,
					token: req.body.token
				});
			}
		});
	});

	router.get('/admin/dashboard', isLoggedIn, function (req, res) {
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