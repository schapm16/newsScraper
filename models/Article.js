var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: String,
    summary: String,
    articleURL: String,
    imageURL: String,
    saved: Boolean
    
});

module.exports = mongoose.model('Article', ArticleSchema);
