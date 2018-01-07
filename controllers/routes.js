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
        console.log('Scrape Complete - Results Sent');
        res.json(data);
      });

    });

  });

  app.put('/save-article/:articleId', function(req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.articleId }, { saved: true }, {new: true}, function(err, data) {
      console.log('Article Saved');
      res.json(data);
    });
  });

  app.put('/delete-article/:articleId', function(req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.articleId }, { saved: false }, {new: true}, function(err, data) {
      console.log('Article Deleted');
      res.json(data);
    });
  });
  
  // app.post('/add-note')
}

module.exports = routes;
