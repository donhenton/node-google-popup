/*
 * not used at this time
 * 
 * @returns {undefined}
 */
/* global CONFIG */

function popUpWindow( )
{

    var url = "https://accounts.google.com/o/oauth2/v2/auth?" +
            "&response_type=token" +
            "&redirect_uri=" + CONFIG.popup_redirect_uri +
            "&scope=profile+email" +
            "&client_id=" + CONFIG.client_id;

    //var options = {};
    //options['windowName'] = "GoogleOAuthWindow";
    //options['windowOptions'] = "location=100,status=0,"
    // 630133481040-npvicb6lrpcpssitgci9drar71cl7vej.apps.googleusercontent.com"

    var windowName = "authWindow";
    var self = this;
    var windowHandle = window.open(url, windowName, "location=0,status=0,height=500,width=400");
    //console.log("windowHandle " + windowHandle);
    var tokenInfo = null;
    var pollTimer = window.setInterval(function () {
        try {
            //console.log(windowHandle.document.URL.indexOf(CONFIG.popup_redirect_uri));
            //console.log("hit "+ windowHandle.closed) 


            if (windowHandle.closed != false)
            {
                
                console.log("the window has been closed");
                window.clearInterval(pollTimer);
                if (windowHandle.document)
                {
                    console.log("successfully selected a google account")
                    var url = windowHandle.document.URL;
                    // console.log("url "+url)
                    url = url.replace("#", "?");
                    //  console.log("url "+url)
                    tokenInfo = {};
                    tokenInfo['access_token'] = gup(url, 'access_token');
                    tokenInfo['token_type'] = gup(url, 'token_type');
                    tokenInfo['expires_in'] = gup(url, 'expires_in');
                    validateToken(tokenInfo);
                }
                windowHandle.close();

                
            }
        } catch (e) {
            console.log("error " + e)
        }
    }, 100);


}

//credits: http://www.netlobo.com/url_query_string_javascript.html
function gup(url, name) {
    name = name.replace(/[[]/, "\[").replace(/[]]/, "\]");
    var regexS = "[\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    if (results == null)
        return "";
    else
        return results[1];
}

function validateToken(tokenInfo)
{

    console.log("validate " + JSON.stringify(tokenInfo));

}

$(document).ready(
        function ()
        {
            $('#popUpLink').click(function (e) {
                console.log("Bite me!!!!!!!")
                e.stopPropagation();
                popUpWindow();
            });
        });