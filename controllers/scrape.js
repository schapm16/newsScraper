var request = require('request');
const cheerio = require('cheerio');

module.exports = function(cb, cbb) {
  request('http://www.charlotteobserver.com/latest-news/', function(error, response, body) {

    var $ = cheerio.load(body);
    $('#story-list-1 article, #story-list-2 article, #story-list-3 article').each(function(index, element) {
      var title = $(this).find('.title a').text().trim();
      var summary = $(this).text().trim().split(/\n+/)[2];
      var articleURL = $(this).find('.title a').attr('href');
      var imageURL = $(this).find('img').data('proxy-image');
      console.log(summary);
      if (imageURL) {
        imageURL = imageURL.replace('ALTERNATES/LANDSCAPE_80', 'alternates/LANDSCAPE_320');
      }

      cb({
        title: title,
        summary: summary,
        articleURL: articleURL,
        imageURL: imageURL
      });
    });
    
    setTimeout(cbb, 3000);
  });
};
