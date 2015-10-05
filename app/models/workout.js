var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var workoutSchema = new mongoose.Schema({
	title: String,
	workoutDate: { type: Date, default: Date.now },
	comments: String,
	exercises: [{
							exercise: {type: mongoose.Schema.Types.ObjectId, ref: 'exrx'},
							reps:Number,
							sets:Number,
							weight:Number
						}]
})
.plugin(deepPopulate);

mongoose.model('workout', workoutSchema);