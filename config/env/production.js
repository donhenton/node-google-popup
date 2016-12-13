// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'production' environment configuration object
module.exports = {
    sessionSecret: 'productionSessionSecret',
    db: {url: 'mongodb://localhost/local'},
    clientID: 'stugff',
    clientSecret: 'stuff',
    callbackURL: 'http://localhost:3500/auth/google/callback'
};