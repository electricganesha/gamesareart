var mongoose = require('mongoose');
var dbURI = 'mongodb://mongodb:27017/gamesareart';

var path = require('path'),
	rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	development: {
		rootPath: rootPath,
		db: dbURI,
        port: process.env.PORT || 3000,
	},
	production: {
		rootPath: rootPath,
		db: process.env.MONGOLAB_URI || 'you can add a mongolab uri here ($ heroku config | grep MONGOLAB_URI)',
        port: process.env.PORT || 80,
	}
};

mongoose.connection.on('connected', function(){
    console.log('Mongoose connected to '+ dbURI);
});

mongoose.connection.on('error', function(err){
    console.log('Mongoose connection error: '+ err);
});

mongoose.connection.on('disconnected', function(){
    console.log('Mongoose disconnected');
});

gracefulShutdown = function(msg, callback){
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
}

//Nodemon restarts
process.once('SIGUSR2', function(){
    gracefulShutdown('nodemon restart', function(){
        process.kill(process.pid, 'SIGUSR2');
    });
});

//App termination
process.on('SIGINT', function(){
    gracefulShutdown('App termination', function(){
        process.exit(0);
    });
});