/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , path = require('path')

var favicon = require('serve-favicon')
  , logger = require('morgan')
  , methodOverride = require('method-override')
  , session = require('express-session')
  , bodyParser = require('body-parser')
  , multer = require('multer')
  , errorHandler = require('errorhandler')

var nattyApp = express();

nattyApp.set('port', process.env.PORT || 3000);
nattyApp.set('views', path.join( __dirname, '/views') ); // critical to use path.join on windows
nattyApp.set('view engine', 'vash');
nattyApp.use(favicon(__dirname + '/public/favicon.ico'));
nattyApp.use(logger('dev'));
nattyApp.use(methodOverride());
nattyApp.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'blarg blarg' }));
nattyApp.use(bodyParser.json());
nattyApp.use(bodyParser.urlencoded({ extended: true }));
nattyApp.use(multer());

nattyApp.use(express.static(path.join(__dirname, 'public')));

nattyApp.get('/', routes.index);

if (nattyApp.get('env') == 'development'){
  nattyApp.use(errorHandler());
}

nattyApp.listen(nattyApp.get('port'), function(){
  console.log("Natty server listening on port " + nattyApp.get('port'));
});
