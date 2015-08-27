var mongoose = require('mongoose');

var workoutSchema = new mongoose.Schema({
	title: String,
	workoutDate: { type: Date, default: Date.now },
	comments: String,
	created_at: Date,
  updated_at: Date,
	workout: {type: mongoose.Schema.Types.ObjectId, ref: 'exercise'}
});

mongoose.model('workout', exerciseSchema);