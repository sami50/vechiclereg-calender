$(document).on("click", "#img01", function () {
    alert("img")
    var file_data = $("#inputImage").prop("files")[0];   // Getting the properties of file from file field
    var form_data = new FormData();
    var test =JSON.stringify( "sami");
    // Creating object of FormData class
    form_data.append("file", file_data)
    alert(file_data.name)
    $.ajax({
        url: "/vechicle/checkimg",
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        data: { "file2": test } ,                         // Setting the data attribute of ajax with file_data
        type: 'post'
    })
})