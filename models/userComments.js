var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userCommentsSchema = new Schema({
    comment: String,
    articles: [{
        type: Schema.Ttypes.ObjectId,
        ref: 'userArticles'
    }]
});

var userComments = mongoose.model('userComments', userCommentsSchema);