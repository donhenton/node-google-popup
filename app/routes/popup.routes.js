var rp = require("request-promise");
var Q = require('q');


module.exports = function (app, config) {



     


    ///////////////////////////////////////////////////////////////////////
    // routes
   



    app.get('/auth/google/popup/callback', function (req, res) {

      
       

        // Use the 'response' object to render the 'index' view with a 'title' property
        res.render('popupCallback');

    



    });



}