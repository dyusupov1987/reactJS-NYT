// HW 19 ReactJS, MongoDB, Node
// Require Node Modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');

// Initialize Express
var app = express();
app.use(logger('dev'));
app.use(bodyParser .urlencoded({
  extended: false
}));

// Serve Static Content
app.use(express.static(process.cwd() + '/public'));


if(process.env.MONGODB_URI){
  mongoose.connect(process.env.MONGODB_URI, function(){
    console.log("uri connected");
  });
}
else{
  mongoose.connect('mongodb://localhost/nytreact', function(){
    console.log("local load");
  });
}
var db = mongoose.connection;

// Show any Mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

// Once logged in to the db through mongoose, log  success message
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

// Import the Article model
var Article = require('./models/Article.js');

// Import Routes/Controller
var router = require('./app/config/routes.js');
app.use('/', router);

// Launch App
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Running on port: ' + port);
});


