var Game = require("../models/game");
var Tag = require("../models/tag");
var Author = require("../models/author");
var JSONAPISerializer = require("jsonapi-serializer").Serializer;

// Games API
module.exports = function(apiRouter) {
  var GameSerializer = new JSONAPISerializer("games", {
    attributes: [
      "name",
      "description",
      "release_date",
      "posted_at",
      "authors",
      "publisher",
      "video_link",
      "buy_link",
      "tags",
      "likes"
    ]
  });

  var GenericSerializer = new JSONAPISerializer("generic", {
    attributes: ["message"]
  });

  // get all games
  apiRouter.get("/games", function(req, res) {
    Game.find().exec(function(err, games) {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.send(GameSerializer.serialize(games));
      }
    });
  });

  // get a single game
  apiRouter.get("/games/:id", function(req, res) {
    Game.findById(req.params.id)
      .populate({ path: "authors", model: "Author" })
      .populate({ path: "tags", model: "Tag" })
      .exec(function(err, game) {
        if (err) res.send(err);
        res.send(GameSerializer.serialize(game));
      });
  });

  // get next game
  apiRouter.get("/games/next/:id", function(req, res) {
    Game.findOne({ _id: { $gt: req.params.id } })
      .sort({ _id: 1 })
      .limit(1)
      .populate({ path: "authors", model: "Author" })
      .populate({ path: "tags", model: "Tag" })
      .exec(function(err, game) {
        console.log(err);
        if (err) res.send(err);
        res.send(GameSerializer.serialize(game));
      });
  });

  // get previous game
  apiRouter.get("/games/prev/:id", function(req, res) {
    Game.findOne({ _id: { $lt: req.params.id } })
      .sort({ _id: -1 })
      .limit(1)
      .populate({ path: "authors", model: "Author" })
      .populate({ path: "tags", model: "Tag" })
      .exec(function(err, game) {
        console.log(err);
        if (err) res.send(err);
        res.send(GameSerializer.serialize(game));
      });
  });

  // add a game
  apiRouter.post("/games", function(req, res) {
    calculateTagsAsObjectIds(req.body.tags).then(function(tags) {
      Promise.all(tags).then(function(tags) {
        calculateAuthorsAsObjectIds(req.body.authors).then(function(authors) {
          Promise.all(authors).then(function(authors) {
            var game = new Game();
            game.name = req.body.name;
            game.description = req.body.description;
            game.release_date = req.body.release_date;
            game.posted_at = req.body.posted_at;
            game.authors = authors;
            game.publisher = req.body.publisher;
            game.video_link = req.body.video_link;
            game.buy_link = req.body.buy_link;
            game.likes = 0;
            game.tags = tags;

            game.save(function(err, game) {
              if (err) res.send(err);
              res.json(game);
            });
          });
        });
      });
    });
  });

  // update a game
  apiRouter.put("/games/:id", function(req, res) {
    Game.findById(req.params.id, function(err, game) {
      if (err) res.send(err);

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

      game.save(function(err) {
        if (err) res.send(err);

        res.send(GameSerializer.serialize(game));
      });
    });
  });

  // delete a game
  apiRouter.delete("/games/:id", function(req, res) {
    Game.remove(
      {
        _id: req.params.id
      },
      function(err, game) {
        if (err) res.send(err);
        const response = { message: game.name + " deleted successfully!" };
        res.json(GenericSerializer.serialize(response));
      }
    );
  });
};

const calculateTagsAsObjectIds = rawTags => {
  let requests = rawTags.map(calculateTagAsObjectId);

  const results = Promise.all(requests).then(function() {
    return requests;
  });

  return results;
};

const calculateTagAsObjectId = newTag => {
  return new Promise(resolve => {
    Tag.findOne({ tag: newTag }).exec(function(err, tagId) {
      if (err) {
        console.log(err);
      } else if (!tagId) {
        var tag = new Tag();
        tag.tag = newTag;
        tag.save(function(err, tag) {
          if (err) console.log(err);
          resolve(tag);
        });
      } else {
        resolve(tagId);
      }
    });
  });
};

const calculateAuthorsAsObjectIds = rawAuthors => {
  let requests = rawAuthors.map(calculateAuthorAsObjectId);

  const results = Promise.all(requests).then(function() {
    return requests;
  });

  return results;
};

const calculateAuthorAsObjectId = newAuthor => {
  return new Promise(resolve => {
    Author.findOne({ name: newAuthor }).exec(function(err, authorId) {
      if (err) {
        console.log(err);
      } else if (!authorId) {
        var author = new Author();
        author.name = newAuthor;
        author.save(function(err, author) {
          if (err) console.log(err);
          resolve(author);
        });
      } else {
        resolve(authorId);
      }
    });
  });
};
