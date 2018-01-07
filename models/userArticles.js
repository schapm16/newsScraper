var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userArticlesSchema = new Schema({
    title: String,
    summary: String,
    articleURL: String,
    imageURL: String,
    
});

var userArticles = mongoose.model('userArticles', userArticlesSchema);
