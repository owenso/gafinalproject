var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var exerciseSchema = new mongoose.Schema({  
  exercise_name: String,
  muscle_name: String,
  bodypart_name: String,
  link: String,
  sets: Number,
  reps: Number,
  maxWeight: Number,
  maxReps: Number
}, {collection:'exrx'}).plugin(deepPopulate);

mongoose.model('exrx', exerciseSchema);