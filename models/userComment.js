var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userCommentSchema = new Schema({
    comment: String,
    article: [{
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }]
});

module.exports = mongoose.model('userComment', userCommentSchema);