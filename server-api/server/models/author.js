var mongoose = require('mongoose');
const { Schema } = mongoose;

var authorSchema = new Schema({
	name: { type: String, required:true, index:true, unique:true }
});

authorSchema.pre('save', function(next){
  next();
});

module.exports = mongoose.model('Author', authorSchema);