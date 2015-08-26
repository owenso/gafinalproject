var User = require('./models/user');
var exrx = require('./models/exercise');
var mongoose = require('mongoose');
var path = require('path');



module.exports = function(app) {
    app.get('/api/users', function(req, res, next) {
        mongoose.model('User').find({}, function(err, users) {
            if (err) {
                return console.error(err);
            } else {
                res.json(users);
            }
        });
    });
    app.get('/api/exercises', function(req, res, next) {
        mongoose.model('exrx').find({}, function(err, exercises) {
            if (err) {
                return console.error(err);
            } else {
                res.json(exercises);
            }
        });
    });
    app.post('/login', function(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        mongoose.model('User').findOne({
            'username': username
        }, function(err, user) {
            if (err) {
                req.flash('error', err);
                res.send(err);

            } else {
                if (user) {
                    console.log(user);
                    user.comparePassword(password, function(passMatch) {
                        if (passMatch) {
                            console.log('password accepted');
                            req.session.userid = user._id;
                            req.session.name = user.name;
                            res.json(user);
                        } else {
                            res.status(401).send('Wrong user or password');

                        }
                    });
                } else {
                    res.status(401).send('Wrong user or password');

                }
            }
        });
    });
    app.post('/logout', function(req, res, next) {
        req.session.destroy();
        res.redirect('/');
    });
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/views/index.html'));
    });
};
