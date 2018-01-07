var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userCommentSchema = new Schema({
    comment: String,
    articles: [{
        type: Schema.Types.ObjectId,
        ref: 'userArticles'
    }]
});

module.exports = mongoose.model('userComment', userCommentSchema);