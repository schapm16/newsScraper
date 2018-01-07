var scrape = require('./scrape.js');
var db = require('../models/index.js');

function routes(app) {

  app.get('/', function(req, resp) {
    resp.send('Hello World');
  });

  app.get('/scrape', function(req, res) {
    console.log('Scrape Requested');
    scrape(function(articleContents) {
      db.Article.create(articleContents, function(err) {
        if (err) throw err;
      });
    }, function() {
      db.Article.find({}, function(err, data) {
        if (err) throw err;
        console.log('Scrape Complete - Results Sent');
        res.json(data);
      });

    });

  });

  app.put('/article/save/:articleId', function(req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.articleId }, { saved: true }, { new: true }, function(err, data) {
      if (err) throw err;
      console.log('Article Saved');
      res.json(data);
    });
  });

  app.put('/article/delete/:articleId', function(req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.articleId }, { saved: false }, { new: true }, function(err, data) {
      if (err) throw err;
      console.log('Article Deleted');
      res.json(data);
    });
  });

  app.post('/comment/add', function(req, res) {
    db.userComment.create({ comment: req.body.comment }, function(err, data) {
      if (err) throw err;
      console.log('New Comment');
      db.Article.findOneAndUpdate({ _id: req.body.articleId }, { $push: { comments: data._id } }, {new: true}, function(err, data) {
        if (err) throw err;
        console.log('Comment Saved To Article');
        res.json(data);
      });
    });

  });
  
  app.put('/comment/edit', function(req, res) {
    db.userComment.findOneAndUpdate({_id: req.body.commentId}, {$set: {comment: req.body.comment}}, {new: true}, function(err, data) {
      if (err) throw err;
      console.log('Comment Edited');
      res.json(data);
    });
  });
  
  app.delete('/comment/delete/:commentId', function(req, res) {
    var commentId = req.params.commentId;
    db.userComment.findOneAndRemove({_id: commentId}, function(err) {
      if (err) throw err;
      console.log('Comment Deleted');
    });
    db.Article.findOneAndUpdate({comments: commentId}, {$pull: {comments: commentId}}, {new: true}, function(err, data) {
      if (err) throw err;
      console.log('Reference To Comment Deleted From Article');
      res.json(data);
    });
  });
}

module.exports = routes;
