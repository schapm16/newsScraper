// Express
var express = require('express');
var app = express();
var PORT = 8080;

// Body-Parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express static
app.use(express.static('public'));

// Express-Handlebars
var exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Mongoose Connection To MongoDB
var mongoose = require('mongoose');
var MONGODB_URI ='mongodb://localhost/mongoHeadlines';
mongoose.connect(MONGODB_URI)
    .then(function() {
        console.log('Mongoose Connected');
    })
    .catch(function() {
        console.log('Failed - Mongoose Connection');
    });

// Invoke Routes
require('./controllers/routes.js')(app);


app.listen(8080, function() {
    console.log('Server listening on Port 8080');
});

module.exports = app;
