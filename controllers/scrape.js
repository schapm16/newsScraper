var request = require('request');
const cheerio = require('cheerio');

module.exports = function(cb, cbb) {
  request('http://www.charlotteobserver.com/latest-news/', function(error, response, body) {

    var $ = cheerio.load(body);
    var articles = $('#story-list-1 article, #story-list-2 article, #story-list-3 article');
    var articleIndex;
    var lastArticleIndex = articles.length - 1;

    articles.each(function(index, article) {
      articleIndex = index;
      var title = $(this).find('.title a').text().trim();
      var summary = $(this).find('.teaser').contents().last().text().trim();
      var articleURL = $(this).find('.title a').attr('href');
      var imageURL = $(this).find('img').data('proxy-image');
      if (imageURL) {
        imageURL = imageURL.replace('ALTERNATES/LANDSCAPE_80', 'alternates/LANDSCAPE_320');
      }

      cb(articleIndex, lastArticleIndex, {
        title: title,
        summary: summary,
        articleURL: articleURL,
        imageURL: imageURL
      });
    });

  });
};
