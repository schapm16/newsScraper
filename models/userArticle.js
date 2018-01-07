var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userArticleSchema = new Schema({
    title: String,
    summary: String,
    articleURL: String,
    imageURL: String,
    
});

module.exports = mongoose.model('userArticle', userArticleSchema);
