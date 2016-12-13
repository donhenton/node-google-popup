/*
 * not used at this time
 * 
 * @returns {undefined}
 */
function popUpWindow( )
{

    var url = "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline" +
            "&prompt=consent&response_type=token" +
            "&redirect_uri="+ CONFIG.redirect_uri +
            "&scope=profile+email+https://www.googleapis.com/auth/plus.login+https://www.googleapis.com/auth/calendar" +
            "&client_id=" + CONFIG.client_id ;


   // 630133481040-npvicb6lrpcpssitgci9drar71cl7vej.apps.googleusercontent.com"

    var windowName = "authWindow";

    var windowHandle = window.open(url, windowName, "height=500,width=400");
    console.log("windowHandle "+windowHandle);




}

/*
 function openDialog(page) {
 var $dialog = $('#popUpLink')
 .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
 .dialog({
 title: "Page",
 autoOpen: false,
 dialogClass: 'dialog_fixed,ui-widget-header',
 modal: true,
 height: 500,
 minWidth: 400,
 minHeight: 400,
 draggable:true,
 
 buttons: { "Ok": function () {         $(this).dialog("close"); } }
 });
 $dialog.dialog('open');
 } 
 */



$('#popUpLink').click(function (e) {
    e.stopPropagation();
    popUpWindow();
});