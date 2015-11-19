# jquery-simple-autodatasync
Very simple jquery plugin for handling automatic input data saving on change. Based on data attributes

Exemple usages : 

$('.updatePrice').AutoDataSync({
    // The data-attributes array will be map as key/value data for the request
    dataAttributes : ["id_employee","id_price"],
    post : "/myProcessingCode.php",
    success : function (response) {
        console.log("yay data saved !")
    }
    // Any other $.ajax() options can be used
});
