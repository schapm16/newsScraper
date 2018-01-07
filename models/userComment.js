var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userCommentSchema = new Schema({
    comment: String
});

module.exports = mongoose.model('userComment', userCommentSchema);