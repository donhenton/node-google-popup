module.exports = function (app,config) {
 
  
  
    var indexRender = function (req, res) {

       

        // Use the 'response' object to render the 'index' view with a 'title' property
        res.render('index', {
            title: 'On Demand Google Auth Demo' ,
            CONFIG:  JSON.stringify({client_id: config.clientID, redirect_uri: config.callbackURL, popup_redirect_uri: config.popupCallbackURL})
        });

    };

 

    ///////////////////////////////////////////////////////////////////////
    // routes
    ///////////////////////////////////////////////////////////////////////
    app.get('/', function (req, res,next) {
         
            indexRender(req,res);
         

    });
    
    
    
 
}