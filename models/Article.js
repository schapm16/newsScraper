var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: String,
    summary: String,
    articleURL: String,
    imageURL: String,
    saved: {
        type: Boolean,
        default: false
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'userComment'
    }]
    
});

module.exports = mongoose.model('Article', ArticleSchema);
