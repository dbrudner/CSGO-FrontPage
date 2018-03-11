
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 5000;

var bodyParser   = require('body-parser');
var path = require('path')


app.use(express.static(path.join(__dirname, 'react/build')));




// routes ======================================================================h
require('./app/routes.js')(app); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('Listening on port ' + port);