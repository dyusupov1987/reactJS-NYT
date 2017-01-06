// Include dependencies
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Import the Article model
var Article = require('../../models/Article.js');

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/public/index.html");
});

// Node Dependencies
var express = require('express');
var router = express.Router();

// Main GET - This will display the ReactJS application.
router.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/public/index.html");
});

// Components will use this API GET route to query MongoDB for all saved articles
app.get("/api/saved", function(req, res) {
  // We will find all the records
  Article.find({}, function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// Components will use this API POST route to save an article to to MongoDB 
router.post("/api/saved", function(req, res) {
  var entry = new Article (req.body); // Create new entry to MongoDB
  entry.save(function(err, doc) { // Save entry to MongoDB
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } 
    else {
      console.log(err);
      res.snedStatus(200);
    }
  });
});

// Components will use API POST route to delete a saved article from the MongoDB
router.post("/api/delete/:artilceId", function(req, res) {
  console.log(req.params.articleId);
  // "http://mongoosejs.com/docs/api.html#query_Query-findOneAndRemove"
  Article.findByIdAndRemove(req.params.articleId, function(err, todo) {
    if(err) {
      console.log(err);
      res.sendStatus(400);
    }
    else {
      res.sendStatus(200);
    }
  });
});

// For unknown cases user gets redirected to "/" route
router.get("*", function(req, res) {
  res.redirect("/");
});

// Export Router to Server.js
module.exports = router;
