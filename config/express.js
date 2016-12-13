// Invoke 'strict' JavaScript mode
//set up for angular websocket server

'use strict';
var codeUtils = new require('./../app/utils/utils')();


// Load the module dependencies
var config = require('./config'),
        express = require('express'),
        morgan = require('morgan'),
        compress = require('compression'),
        bodyParser = require('body-parser'),
        methodOverride = require('method-override'),
        session = require('express-session');

var fs = require('fs');
var vm = require('vm');
var cookieParser = require('cookie-parser');
 

// Define the Express configuration method
module.exports = function () {
    // Create a new Express application instance
    var app = express();

    // Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }
    var cookieOpts = {};
    app.use(cookieParser(config.sessionSecret, cookieOpts));

    // see https://www.npmjs.com/package/cookie for the various options
    // that can be specificed in the cookieOpts;

    // Use the 'body-parser' and 'method-override' middleware functions
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    var MongoStore = require('connect-mongo')(session);
    app.use(session({
        secret: config.sessionSecret,
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({
            url: config.db.url,
        })
    }));

 


    // Set the application view engine and 'views' folder
    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    // Load the 'index' routing file

    require('../app/routes/auth.routes.js')(app,config);
    require('../app/routes/pages.routes.js')(app,config);
    require('../app/routes/calendar.routes.js')(app,config);


    // Configure static file serving
    app.use(express.static('./public'));

    /* error handlers must be located at end */
    var clientErrorProcessor = require('../app/filters/clientErrorProcessor');
    var generalErrorProcessor = require('../app/filters/generalErrorProcessor');
    app.use(clientErrorProcessor);
    app.use(generalErrorProcessor);

    // Return the Express application instance

    //always place this as the last this is the 404 handler
    require('../app/routes/not.found.routes.js')(app);


    return app;
};