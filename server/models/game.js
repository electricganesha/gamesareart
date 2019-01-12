var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({
	name: { type: String, required:true },
    description : { type: String },
    release_date: { type: Date, required:true },
    posted_at : { type: Date, required:true },
    authors: [{type:String}],
    publisher: {type : String},
    video_link: {type: String},
    buy_link: { type : String},
    tags: [{type: String}],
    likes: {type : Number}
});

gameSchema.pre('save', function(next){
  now = new Date();
  this.posted_at = now;
  next();
});

module.exports = mongoose.model('Game', gameSchema); 