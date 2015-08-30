var User = require('./models/user');
var exrx = require('./models/exercise');
var workout = require('./models/workout');
var mongoose = require('mongoose');
var path = require('path');



module.exports = function(app) {
    app.get('/api/users', function(req, res, next) {
        mongoose.model('User').find({}, function(err, users) {
            if (err) {
                return console.error(err);
            } else {
                // res.json(users);
            }
        });
    });
    app.get('/api/users/:id', function(req, res, next) {
        mongoose.model('User').findOne({'_id':req.params.id}, function(err, user) {
            if (err) {
                return console.error(err);
            } else {
                res.json(user);
            }
        })
            .populate('workouts')
            .exec(function(error, users) {
                console.log('in here');
                users.populate('workouts.exercises')
                .exec(function(error, workouts){

                });
            });
    });
    app.post('/api/adduser', function(req, res, next) {
        console.log(req.body);
        mongoose.model('User').create(req.body, function(err, user) {
            if (err) {
                return console.error(err);
            } else {
                res.json(user);
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
    app.get('/api/exercises/:id', function(req, res, next) {
        mongoose.model('exrx').find({'_id':req.params.id}, function(err, exercise) {
            if (err) {
                return console.error(err);
            } else {
                res.json(exercise);
            }
        });
    });
    app.get('/api/workouts', function(req, res, next) {
        mongoose.model('workout').find({}, function(err, exercises) {
            if (err) {
                return console.error(err);
            } else {
                res.json(exercises);
            }
        });
    });
    app.post('/api/addworkout', function(req, res, next) {
        mongoose.model('workout').create(req.body.workoutData, function(err, workout) {
            if (err) {
                return console.error(err);
            } else {
                mongoose.model('User').findOne({_id:req.body.idData.id}, function(err, user){
                    console.log(user);
                if (err) {
                    return console.error(err);
                } else {
                    //save key to workout
                      user.workouts.push(workout._id);
                      user.save();
                    }
                    res.json(workout);
        });
    }
    });
});
    app.post('/api/addexercise/:workout/:exercise', function(req, res, next) {
        mongoose.model('workout').findOne({'_id':req.params.workout}, function(err, workout) {
            if (err) {
                return console.error(err);
            } else {
            mongoose.model('exrx').findOne({'_id':req.params.exercise}, function(err, exercise) {
                if (err) {
                    return console.error(err);
                } else {
                    //save key to workout
                      workout.exercises.push(exercise._id);
                      workout.save();
                    }
                    res.json(exercise);
            });
            }
        });
    }); 
    app.get('/api/workouts/:id', function(req, res, next) {
        mongoose.model('workout').find({'_id':req.params.id}, function(err, exercise) {
            if (err) {
                return console.error(err);
            } else {
                res.json(exercise);
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
