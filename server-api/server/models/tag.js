var mongoose = require('mongoose');
const { Schema } = mongoose;

var tagSchema = new Schema({
	tag: { type: String, required:true, index:true, unique:true }
});

tagSchema.pre('save', function(next){
  next();
});

module.exports = mongoose.model('Tag', tagSchema);