var Author = require('../models/author');

// Authors API
module.exports = function(apiRouter){

	// get all authors
	apiRouter.get('/authors', function(req, res){

		Author.find()
		.exec(function(err, authors){
			if(err)
			{
				res.send(err);
				console.log(err);
			}
			else
			{
				res.json(authors);
			}

		});
    });
    
    // get a single author
	apiRouter.get('/authors/:id', function(req, res){
		Authors.findById(req.params.id, function(err, author){
			if (err) res.send(err);
			res.json(author);
		});
	});

	// add an author
	apiRouter.post('/authors', function(req, res){

		var author = new Author();
		author.name = req.body.name;

		author.save(function(err, author){
			if(err) res.send(err);
			res.json(author);
		})
	});

	// update an author
	apiRouter.put('/authors/:id', function(req, res){
		Author.findById(req.params.id, function(err, author){

			if(err) res.send(err);

			author.name = req.body.name;

			author.save(function(err){
				if(err) res.send(err);

				res.json({ message: 'Author updated!' });
			})
		});
	});

	// delete an author
	apiRouter.delete('/authors/:id', function(req, res){
		Author.remove({
			_id: req.params.id
		}, function(err, author){
			if(err) res.send(err);

			res.json({ message: 'Author deleted!' });
		})
	});
};