var mongoose = require('mongoose');

var workoutSchema = new mongoose.Schema({
	title: String,
	workoutDate: { type: Date, default: Date.now },
	comments: String,
	exercises: [{type: mongoose.Schema.Types.ObjectId, ref: 'exercise'}]
});

mongoose.model('workout', workoutSchema);