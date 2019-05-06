var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
const { Schema } = mongoose;

mongoosePaginate.paginate.options = { 
  lean:  true,
  limit: 16
};

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

gameSchema.plugin(mongoosePaginate);

gameSchema.pre('save', function(next){
  now = new Date();
  this.posted_at = now;
  next();
});

module.exports = mongoose.model('Game', gameSchema);