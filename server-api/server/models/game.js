var mongoose = require('mongoose');
const { Schema } = mongoose;

var gameSchema = new Schema({
	  name: { type: String, required:true, index:true, unique:true },
    description : { type: String },
    release_date: { type: Date, required:true },
    posted_at : { type: Date, required:true },
    authors: [{ type: Schema.Types.ObjectId, ref: 'Author' }],
    publisher: {type : String},
    video_link: {type: String},
    buy_link: { type : String},
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    likes: {type : Number}
});

gameSchema.pre('save', function(next){
  now = new Date();
  this.posted_at = now;
  next();
});

module.exports = mongoose.model('Game', gameSchema);