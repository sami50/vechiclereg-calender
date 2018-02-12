function readjn() {

    var event2 = [];
    var resource2 = [];

    var readjson = $.getJSON("/Scripts/fcalender/demos/json/custom.json", function (data)
    {
        console.log("success" + data);
    })
       .done(function () {
           console.log("second success");

       })
       .fail(function () {
           alert("error");
       });

    $.each(readjson, function (key, v) {
        //event2.push({
        //    id: v.reservation.reservationid,
        //    resourceId: v.vid,
        //    start: v.bkdate1,
        //    end: v.bkdate2
        //})

        //resource2.push({
        //    id: v.vechicleid,
        //    title: v.vid
        //})
        alert(v + " " );
    });
   
}