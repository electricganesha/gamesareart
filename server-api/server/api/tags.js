var Tag = require('../models/tag');
var JSONAPISerializer = require('jsonapi-serializer').Serializer;

// Tags API
module.exports = function(apiRouter){
	var TagSerializer = new JSONAPISerializer('tags', {
		attributes: ['tag']
	});

	// get all tags
	apiRouter.get('/tags', function(req, res){

		Tag.find()
		.exec(function(err, tags){
			if(err)
			{
				res.send(err);
				console.log(err);
			}
			else
			{
				res.json(TagSerializer.serialize(tags));
			}

		});
    });
    
    // get a single tag
	apiRouter.get('/tag/:id', function(req, res){
		Tag.findById(req.params.id, function(err, tag){
			if (err) res.send(err);
			res.json(tag);
		});
	});

	// add a tag
	apiRouter.post('/tags', function(req, res){

		var tag = new Tag();
		tag.tag = req.body.tag;

		tag.save(function(err, tag){
			if(err) res.send(err);
			res.json(tag);
		})
	});

	// update a tag
	apiRouter.put('/tags/:id', function(req, res){
		Tag.findById(req.params.id, function(err, tag){

			if(err) res.send(err);

			tag.tag = req.body.tag;

			tag.save(function(err){
				if(err) res.send(err);

				res.json({ message: 'Tag updated!' });
			})
		});
	});

	// delete a tag
	apiRouter.delete('/tags/:id', function(req, res){
		Tag.remove({
			_id: req.params.id
		}, function(err, tag){
			if(err) res.send(err);

			res.json({ message: 'Tag deleted!' });
		})
	});
};