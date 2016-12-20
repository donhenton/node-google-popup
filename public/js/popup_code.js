/*
 * not used at this time
 * 
 * @returns {undefined}
 */
/* global CONFIG */

function popUpWindow( )
{
    $('#replyData').val("")
    var url = "https://accounts.google.com/o/oauth2/v2/auth?" +
            "&response_type=token" +
            "&redirect_uri=" + CONFIG.popup_redirect_uri +
            "&scope=profile+email" +
            "&client_id=" + CONFIG.client_id;

    var validateUrl = 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=';
    //var userInfoUrl = 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=';
    var userInfoUrl = 'https://www.googleapis.com/plus/v1/people/me?access_token=';

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
                    validateToken(validateUrl, userInfoUrl, tokenInfo);
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

function validateToken(validateUrl, userInfoUrl, tokenInfo)
{
    $.ajax(
            {
                url: validateUrl + tokenInfo.access_token,
                data: null
            }
    ).done(function (data)
    {
        //console.log("validate success "+JSON.stringify(data)) 
        return $.ajax(
                {
                    url: userInfoUrl + tokenInfo.access_token,
                    data: null
                }).done(function (data) {
                    
                      JSON.stringify(data) 
                    
                    $('#replyData').val(JSON.stringify(data))
                    return data ;
             
                });

    }).fail(function (xhr, status, error) {
        console.log("ERROR in validate " + JSON.stringify(xhr))
    })
    //console.log("validate " + JSON.stringify(tokenInfo));

}

$(document).ready(
        function ()
        {
            $('#popUpLink').click(function (e) {
                 
                e.stopPropagation();
                popUpWindow();
            });
        });