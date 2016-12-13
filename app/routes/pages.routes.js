module.exports = function (app,config) {

    var passport = require('passport');
   
    var authenticationMiddleware = function (req, res, next) {
        passport.authenticate('google', function (err, user, info) {
            if (err) {
                return next(err);
            }

            if (!user) {
                req.session.messages = info.message;
                return res.redirect('/');
            }

            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }

                req.session.messages = '';
                return res.redirect('/');
            });
        })(req, res, next);
    };



    app.get('/auth/google/callback',authenticationMiddleware);


   app.get('/auth',
   passport.authenticate('google',{accessType: 'offline', prompt: 'consent',scope: ['profile','email','https://www.googleapis.com/auth/plus.login','https://www.googleapis.com/auth/calendar']}));

    var performLogout = function (req, res)
    {
        req.logOut();
        req.session.destroy(function (err)
        {
            if (err)
            {
                console.log("error in closing session " + err.message)
            }
        });
        res.render('loggedout', {
            title: 'Logged Out',
            user: req.user
        });
         
    }
    var indexRender = function (req, res) {



        // Use the 'response' object to render the 'index' view with a 'title' property
        res.render('index', {
            title: 'Node Demonstration App',
            stuff: 'stuff',
            user: req.user
        });

    };

var popUpRender = function (req, res) {



        // Use the 'response' object to render the 'index' view with a 'title' property
        res.render('popUp', {
            title: 'OAuth Popup Demo',
            stuff: 'stuff',
            user: req.user
        });

    };


    ///////////////////////////////////////////////////////////////////////
    // routes
    ///////////////////////////////////////////////////////////////////////
    app.get('/', function (req, res,next) {
        if (req.user)
        {
            indexRender(req,res);
        } else
        {
            res.redirect("/auth")
        }

    });
    
    
    app.get('/popUp', function (req, res,next) {
        if (req.user)
        {
            popUpRender(req,res);
        } else
        {
            res.redirect("/auth")
        }

    });

    app.get('/logout', performLogout);
    app.get('/loggedout', function (req, res)
    {
        res.render('loggedout', {
            title: 'Logged Out',
            user: req.user
        });
    })
}