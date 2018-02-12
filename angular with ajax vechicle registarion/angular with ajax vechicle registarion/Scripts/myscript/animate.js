$(document).ready(function () {
    $("#b01").click(function () {
        
        $("#div01").toggleClass("animated jello");
        //$("#div01").removeClass("");
    });
    $("#bup01").click(function () {

        $("#div01").toggleClass("animated bounceOutLeft");
        //$("#div01").removeClass("");
    });

    $(".td").mouseover(function () {
        $("#div01").toggleClass("animated jackInTheBox");
    })

    $('.btn btn-danger delete').on('click', function () {
        $(this).closest('tr')
            .children('td')
            .animate({ padding: 0 })
            .wrapInner('<div />')
            .children()
            .slideUp(function () { $(this).closest('tr').remove(); });
        return false;
    });

    $("#d01").on('click', function () {
        alert("click dee");

    });
});