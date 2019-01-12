var express = require('express'),
path = require('path'),
//User = require('./models/user'),
Game = require('./models/game');
rootPath = path.normalize(__dirname + '/../'),
apiRouter = express.Router(),
router = express.Router();

module.exports = function(app){
	app.use('/api', apiRouter);
	app.use('/', router);

	// API routes
	//require('./api/users')(apiRouter);
	require('./api/games')(apiRouter);

};