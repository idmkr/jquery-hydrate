# jquery-simple-autodatasync
Very simple jquery plugin for handling automatic input data saving on change.

Exemple usages : 

$('.updatePrice').AutoDataSync({
    dataAttributes : ["id_employee","id_price"],
    url: "/myProcessingCode.php",
    callback : function (response) {
        toastr.success( 
            $(this).parents("tr").data('name')+", "+
            $(this).data("employee-name")+" : " + 
            $(this).val() 
        );
        if(response != "")
            $(this).data('id_price',response);
    }
});
