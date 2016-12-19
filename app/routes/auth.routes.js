var rp = require("request-promise");
var Q = require('q');


module.exports = function (app, config) {



    var obtainCodeRender = function (req, res) {
        var url = "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline" +
                "&prompt=consent&response_type=code" +
                "&redirect_uri=" + config.callbackURL +
                "&scope=profile+email+https://www.googleapis.com/auth/plus.login+https://www.googleapis.com/auth/calendar" +
                "&client_id=" + config.clientID;
        res.redirect(url);

    };

    var handleCallBack = function (req, res)
    {
//        var url = "https://www.googleapis.com/oauth2/v4/token?grant_type=authorization_code" +
//                "&redirect_uri=" + config.callbackURL +
//                "&client_id=" + config.clientID +
//                "&client_secret=" + config.clientSecret +
//                "&code=" + req.query.code;

        var options = {method: 'POST',
            uri: 'https://www.googleapis.com/oauth2/v4/token',
            json: true,
            gzip: true,

            form:
                    {
                        client_secret: config.clientSecret,
                        redirect_uri: config.callbackURL,
                        client_id: config.clientID,
                        code: req.query.code,
                        grant_type: 'authorization_code'
                    }
        }
        rp(options)
                .then(function (body) {
                    //console.log(JSON.stringify(body))
                    var info = {
                        access_token: body.access_token,
                        refresh_token: body.refresh_token,
                        id_token: body.id_token
                    }
                    req.session['refreshToken'] = body.refresh_token;
                    req.session['token'] = body.access_token;

                    return info;


                }).then(function (info) {
            var userOptions = {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + info.access_token,
                },
                //'https://www.googleapis.com/oauth2/v3/userinfo'
                //https://www.googleapis.com/plus/v1/people/me
                uri: 'https://www.googleapis.com/plus/v1/people/me'
            }
            return rp(userOptions);

        }).then(function (body) {
            console.log("userbody\n" + body)
            var user = JSON.parse(body);
            req.session['user'] = user;
            res.redirect('/identityPage')

        })
                .catch(function (err) {
                    throw new Error(err.message);
                });

    }



    ///////////////////////////////////////////////////////////////////////
    // routes
    ///////////////////////////////////////////////////////////////////////
    app.get('/obtainCode', function (req, res, next) {

        obtainCodeRender(req, res);


    });
    app.get('/identityPage', function (req, res) {

        res.render('identityPage', {
            title: 'Identity Page',
            user: req.session.user
        });


    });



    app.get('/auth/google/callback', function (req, res) {

        handleCallBack(req, res);


    });



}