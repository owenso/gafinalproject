var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var workoutSchema = new mongoose.Schema({
	title: String,
	workoutDate: { type: Date, default: Date.now },
	comments: String,
	exercises: [{type: mongoose.Schema.Types.ObjectId, ref: 'exrx'}]
})
.plugin(deepPopulate);

mongoose.model('workout', workoutSchema);