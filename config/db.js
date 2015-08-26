var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost:27017/myfinalproject';

mongoose.connect(dbURI);


mongoose.connection.on('connected', function(){
    console.log('Connected to ' + dbURI);

});

mongoose.connection.on('error', console.error.bind(console, 'connection error'));

mongoose.connection.on('disconnected', function(){
    console.log('Mongoose connection disconnected');
});

process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

module.exports = mongoose;