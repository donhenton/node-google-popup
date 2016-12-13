function doCalendar()
{
    var settings = {

        contentType: 'application/json',
        method: 'POST'

    }
    var request = $.ajax("/calendar", settings);
    request.fail(function (jqXHR, statusText, errorMessage)
    {
        console.log("ERROR " + JSON.parse(jqXHR.responseText).message);
    })
    request.done(function (data, status, jqXHR)
    {
        console.log("SUCCESS " + JSON.stringify(data))
         $('#eventTable').empty();
        data.events.forEach(function(ev) {
            $('#eventTable').append("<tr><td>"+ev.start+"</td><td>"+ev.summary+"</td><td>"+ev.user+"</td></tr>")
        });
        
        
    })



   // var sample = {"events": [{"start": "2017-01-25T07:00:00-06:00", "summary": "Eye appt", "user": "Don Henton"}, {"start": "2017-04-27T13:30:00-05:00", "summary": "dentist", "user": "Don Henton"}]}


}

function quickAdd()
{
    var settings = {

        contentType: 'application/json',
        method: 'POST'

    }
    var request = $.ajax("/quickAdd", settings);
    request.fail(function (jqXHR, statusText, errorMessage)
    {
        console.log("ERROR " + JSON.parse(jqXHR.responseText).message);
    })
    request.done(function (data, status, jqXHR)
    {
        console.log("SUCCESS " + JSON.stringify(data))
        
        
        
    })
}

