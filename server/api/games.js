var Game = require('../models/game');

// Games API
module.exports = function(apiRouter){

	// get all games
	apiRouter.get('/games', function(req, res){

		Game.find().sort('-posted_at')
		.exec(function(err, games){
			if(err)
			{
				res.send(err);
				console.log(err);
			}
			else
			{
				res.json(games);
			}

		});
    });
    
    // get a single game
	apiRouter.get('/game/:id', function(req, res){
		Game.findById(req.params.id, function(err, game){
			if (err) res.send(err);
			res.json(game);
		});
	});

	// add a game
	apiRouter.post('/games', function(req, res){

		var game = new Game();
		game.name = req.body.name;
		game.description = req.body.description;
		game.release_date = req.body.release_date;
		game.posted_at = req.body.posted_at;
		game.authors = req.body.authors;
		game.publisher = req.body.publisher;
		game.video_link = req.body.video_link;
		game.buy_link = req.body.buy_link;
		game.tags = req.body.tags;
		game.likes = req.body.likes;

		game.save(function(err, game){
			if(err) res.send(err);
			res.json(game);
		})
	});

	// update a game
	apiRouter.put('/games/:id', function(req, res){
		Game.findById(req.params.id, function(err, game){

			if(err) res.send(err);

			game.name = req.body.name;
            game.description = req.body.description;
            game.release_date = req.body.release_date;
            game.posted_at = req.body.posted_at;
            game.authors = req.body.authors;
            game.publisher = req.body.publisher;
            game.video_link = req.body.video_link;
            game.buy_link = req.body.buy_link;
            game.tags = req.body.tags;
            game.likes = req.body.likes;

			game.save(function(err){
				if(err) res.send(err);

				res.json({ message: 'Game updated!' });
			})
		});
	});

	// delete a game
	apiRouter.delete('/games/:id', function(req, res){
		Game.remove({
			_id: req.params.id
		}, function(err, game){
			if(err) res.send(err);

			res.json({ message: 'Game deleted!' });
		})
	});
};