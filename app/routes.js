// var User = require('.models/user');
var mongoose = require('mongoose');

module.exports = function(app) {
    app.get('/api/nerds', function(req, res, next) {
        mongoose.model('User').find({}, function(err, users) {
            if (err) {
                return console.error(err);
            } else {
                res.json(users);
            }
        });
    });
	  app.get('*', function(req, res) {
	      res.sendFile('../public/views/index.html'); // load our public/index.html file
	  });
};
