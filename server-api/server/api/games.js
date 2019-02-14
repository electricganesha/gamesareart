var Game = require('../models/game');
var Tag = require('../models/tag');
var JSONAPISerializer = require('jsonapi-serializer').Serializer;

// Games API
module.exports = function(apiRouter){
	var GameSerializer = new JSONAPISerializer('games', {
		attributes: ['name', 'description','release_data','posted_at','authors','publisher','video_link','buy_link','tags','likes']
	});

	// get all games
	apiRouter.get('/games', function(req, res){
		Game.find()
		.exec(function(err, games){
			if(err)
			{
				res.send(err);
				console.log(err);
			}
			else
			{
				res.send(GameSerializer.serialize(games));
			}

		});
    });
    
    // get a single game
	apiRouter.get('/game/:id', function(req, res){
		Game.findById(req.params.id, function(err, game){
			if (err) res.send(err);
			
			res.send({data:game});
		});
	});

	// add a game
	apiRouter.post('/games', function(req, res){

		calculateTagsAsObjectIds(req.body.tags).then(function(tags){
			Promise.all(tags).then(function(tags) {
				var game = new Game();
				game.name = req.body.name;
				game.description = req.body.description;
				game.release_date = req.body.release_date;
				game.posted_at = req.body.posted_at;
				game.authors = req.body.authors;
				game.publisher = req.body.publisher;
				game.video_link = req.body.video_link;
				game.buy_link = req.body.buy_link;
				game.likes = 0;
				game.tags = tags;
				game.save(function(err, game){
					if(err) res.send(err);
					res.json(game);
				});
			  });
			
		});	
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

const calculateTagsAsObjectIds = (rawTags) => {
	let requests = rawTags.map(calculateTagAsObjectId);

	const results = Promise.all(requests).then(function () {
			return requests;	
	});

	return results;
}

const calculateTagAsObjectId = (newTag) => {
	return new Promise((resolve) =>  {
		Tag.findOne({'tag':newTag})
		.exec(function(err, tagId){
			if(err)
			{
				console.log(err);
			}
			else if (!tagId) {
				var tag = new Tag();
				tag.tag = newTag;
				tag.save(function(err, tag){
					if(err) console.log(err);
					resolve(tag);
				});
			}
			else
			{
				resolve(tagId);
			}		
	});	
});
 }