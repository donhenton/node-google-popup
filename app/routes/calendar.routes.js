var log4js = require('log4js');
var logger = log4js.getLogger();
var google = require('googleapis');
var googleAuth = require('google-auth-library');

module.exports = function (app, config) {

    var path = require('path');
    var authVars = {

        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: config.callbackURL

    };


    var reportError = function (res, errorString)
    {
        res.status(500);
        res.json(createError(errorString, "ErrorClass"));
    }

    var createError = function (message, classVar)
    {
        var e = {};
        e["message"] = message;
        e["errorClass"] = classVar;
        return e;
    };


    app.post('/quickadd', function (req, res) {
        var error = function (err) {
            reportError(res, err.toString());
        };
        if (!req.user)
        {
            err(new Error("user must be logged in!"));
        }
        var oauth2Client = createClient(req);
        var calendar = google.calendar('v3');
        calendar.events.quickAdd({
            auth: oauth2Client,
            text: 'get a job!!!!!',
            calendarId: 'primary'}, function (err, response) {

            if (err) {
                error(err)
                return;
            }
            console.log("response is " + JSON.stringify(response))
            res.json(response);
            updateToken(req, oauth2Client);

        })


    });

    /**
     * check if token needs to be added to the session;
     * @param {type} req
     * @param {type} client
     * @returns {undefined}
     */
    var updateToken = function (req, client)
    {
        client.getAccessToken(function (err, token, response) {
            if (err)
            {
                console.log("ERROR: access: "+JSON.stringify(err));
                return;
                
            }
            var current = req.session['token'];
            req.session['token'] = token;
            console.log("current "+current +" new "+token);
        });
                
    }

    var createClient = function (req) {
        var auth = new googleAuth();
        var oauth2Client = new auth.OAuth2(authVars.clientID, authVars.clientSecret, authVars.callbackUrl);
        oauth2Client.setCredentials({
            access_token: req.session.token,
            refresh_token: req.session.refreshToken

        });
        return oauth2Client;
    }


    app.post('/calendar', function (req, res) {
        // console.log(req.body);
        var error = function (err) {
            reportError(res, err.toString());
        };
//        if (!req.user)
//        {
//            error(new Error("use must be logged in !!!!!"));
//            return;
//        }
        var oauth2Client = createClient(req)


        var listEvents = function ()
        {

            var calendar = google.calendar('v3');
            calendar.events.list({
                auth: oauth2Client,
                calendarId: 'primary',
                timeMin: (new Date()).toISOString(),
                maxResults: 10,
                singleEvents: true,
                orderBy: 'startTime'
            }, function (err, response) {
                if (err) {
                    error(err)
                    return;
                }
                var events = response.items;
                if (events.length == 0) {
                    res.json({events: []})

                } else {
                    console.log('Upcoming 10 events:');
                    var eventList = [];
                    for (var i = 0; i < events.length; i++) {
                        var event = events[i];
                        var start = event.start.dateTime || event.start.date;
                        eventList.push({start: start, summary: event.summary, user: event.organizer.displayName});
                        //console.log('%s - %s', start, event.summary);
                    }
                    updateToken(req, oauth2Client);
                    res.status(200);
                    res.json({events: eventList});
                }
            });

        };


        listEvents();

    });




}