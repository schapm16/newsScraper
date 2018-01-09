var scrape = require('./scrape.js');
var db = require('../models/index.js');

function routes(app) {

  app.get('/', function(req, res) {
    db.Article.remove({ saved: false }, function(err) {
      if (err) throw err;
      console.log("Unsaved Articles Removed");
    });

    res.render('home', {
      styleSheet: '/css/home.css',
      script: '/javascript/home.js'

    });
  });

  app.get('/scrape', function(req, res) {
    console.log('Scrape Requested');
    scrape(function(articleIndex, lastArticleIndex, articleContents) {
      db.Article.create(articleContents, function(err) {
        if (err) {
          if (err.message) console.log(err.message);
          else throw err;
        }

        if (articleIndex === lastArticleIndex) {
          res.redirect('/article');
        }
      });
    });
  });

  app.get('/article', function(req, res) {
    db.Article.find({}, function(err, data) {
      if (err) throw err;
      res.render('allArticles', {
        article: data,
        styleSheet: '/css/allArticles.css',
        script: '/javascript/allArticles.js'
      });
    });
  });

  app.get('/article/saved', function(req, res) {
    console.log('Saved Articles Request');
    db.Article.find({ saved: true }).populate('comments').exec(function(err, data) {
      if (err) throw err;
      console.log("Saved Articles Sent");
      res.render('savedArticles', {
        article: data,
        styleSheet: '/css/savedArticles.css',
        script: '/javascript/savedArticles.js'
      });
    });
  });

  app.put('/article/save', function(req, res) {
    db.Article.findOneAndUpdate({ _id: req.body.articleId }, { saved: true }, { new: true }, function(err, data) {
      if (err) throw err;
      console.log('Article Saved');
      res.sendStatus(200);
    });
  });

  app.put('/article/delete', function(req, res) {
    db.Article.findOneAndUpdate({ _id: req.body.articleId }, { saved: false }, { new: true }, function(err, data) {
      if (err) throw err;
      console.log('Article Deleted');
      res.sendStatus(200);
    });
  });

  app.get('/comment/:articleId', function(req, res) {
    console.log('Article Comments Request ' + req.params.articleId);
    db.Article.find({ _id: req.params.articleId }).populate('comments').exec(function(err, data) {
      if (err) throw err;
      console.log("Article Comments Sent");
      res.json(data);
    });
  });

  app.post('/comment/add', function(req, res) {
    db.userComment.create({ comment: req.body.comment }, function(err, data) {
      if (err) throw err;
      console.log('New Comment');
      db.Article.findOneAndUpdate({ _id: req.body.articleId }, { $push: { comments: data._id } }, { new: true }, function(err, data) {
        if (err) throw err;
        console.log('Comment Saved To Article');
        res.json(data);
      });
    });

  });

  app.put('/comment/edit', function(req, res) {
    db.userComment.findOneAndUpdate({ _id: req.body.commentId }, { $set: { comment: req.body.comment } }, { new: true }, function(err, data) {
      if (err) throw err;
      console.log('Comment Edited');
      res.json(data);
    });
  });

  app.delete('/comment/delete', function(req, res) {
    var commentId = req.body.commentId;

    db.userComment.findOneAndRemove({ _id: commentId }, function(err) {
      if (err) throw err;
      console.log('Comment Deleted');
    });

    db.Article.findOneAndUpdate({ comments: commentId }, { $pull: { comments: commentId } }, { new: true }, function(err, data) {
      if (err) throw err;
      console.log('Reference To Comment Deleted From Article');
      res.json(data);
    });
  });
}

module.exports = routes;
