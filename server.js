// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
var mongoose = require('mongoose');
var path = require('path');
var session = require('express-session');
app.use(session({secret: 'log_reg'}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './client/static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './client/views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');

require('./server/config/mongoose.js')

var route_setter = require('./server/config/routes.js');

route_setter(app);

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
  console.log("listening on port 8000");
})
