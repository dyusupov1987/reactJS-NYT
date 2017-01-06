// Require Mongoose
var mongoose = require('mongoose');

// Creat a Schema Class
var ArticleSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true 
  },
    date: {
        type: String,
        required: true
  },
    url: {
        type: String,
        required: true 
    }

});

//  Create Article model with Mongoose
var Article = mongoose.model('Article', ArticleSchema);

//  Export the Model
module.exports = Article;