var request = require('request');
const cheerio = require('cheerio');

function pageElements() {
  
}

function routes(app) {

  app.get('/', function(req, resp) {
    resp.send('Hello World');
  });

  app.get('/scrape', function(req, resp) {
    console.log('Scrape Requested');

    request('http://www.charlotteobserver.com/latest-news/', function(error, response, body) {
      // var arr = [];  // TESTING ONLY

      var $ = cheerio.load(body);
      $('#story-list-1 article, #story-list-2 article, #story-list-3 article').each(function(index, element) {
        var title = $(this).find('.title a').text().trim();
        var summary = $(this).text();
        var articleURL = $(this).find('.title a').attr('href');
        var imageURL = $(this).find('img').data('proxy-image');
        
        if (imageURL) {
          imageURL = imageURL.replace('ALTERNATES/LANDSCAPE_80', 'alternates/LANDSCAPE_320');
        }
        
        // TESTING ONLY
        // arr.push({ 
        //   title: title,
        //   summary: summary,
        //   articleURL: articleURL,
        //   imageURL: imageURL
        // }); 

      });
      
      // Testing
      // resp.json(arr);
    });
  });

  // app.post('/save-article')

  // app.post('/add-note')
}

module.exports = routes;
