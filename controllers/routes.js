var scrape = require('./scrape.js');
var db = require('../models/index.js');

function routes(app) {

  app.get('/', function(req, resp) {
    resp.send('Hello World');
  });

  app.get('/scrape', function(req, res) {
    console.log('Scrape Requested');
    scrape(function(articleContents) {
      db.Article.create(articleContents, function(err){
        if (err) throw err;
      });
    }, function() {
      db.Article.find({}, function(err, data){
      res.json(data);  
      });
      
    });
    
  });

  //  Future Routes
  // app.get('/save-article')
  // app.post('/add-note')
}

module.exports = routes;
