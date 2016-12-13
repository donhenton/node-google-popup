module.exports = function (app,config) {
 
   /*
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

*/




  
    var indexRender = function (req, res) {



        // Use the 'response' object to render the 'index' view with a 'title' property
        res.render('index', {
            title: 'Node Demonstration App',
            stuff: 'stuff' 
        });

    };

 

    ///////////////////////////////////////////////////////////////////////
    // routes
    ///////////////////////////////////////////////////////////////////////
    app.get('/', function (req, res,next) {
         
            indexRender(req,res);
         

    });
    
    
    
 
}