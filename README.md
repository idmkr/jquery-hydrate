# jQuery simple input auto datasync on change
Very simple jquery plugin for handling automatic input data saving on change. A "value" data key will be set based the form input value.

Exemple usages : 
```
$('.updatePrice').AutoDataSync({
    // The data-attributes array will be map as key/value data for the request
    dataAttributes : ["id_employee","id_price"],
    post : "/myProcessingCode.php",
    success : function (response) {
        console.log("yay data saved !");
        $(this).css({border:"1px solid green"});
    }
    // Any other $.ajax() options can be used
});
```
```
$.fn.AutoDataSync = function (options) {
	$(this).each(function () {
		var $input = $(this);
		var o = { data: { value: $input.val() } };
	
		$.each(options,function (p,v) {
			if(p.match(/post|get/i))
				o.method = p, o.url = v;
			else if(p.match(/dataattributes/i))
				$.map(v,function (d) { o.data[d]=$input.data(d) });
			else if(p.match(/success|error/i))
				o[p]=function (r) {typeof v == "function" && $.proxy(v,$input,r)()} 
			else 
				o[p] = v;
		})

		$input.bind({
			keyup :function(e) { e.keyCode === 13 && $input.blur(); },
			blur : function () { $.ajax(o); }
		})
	})
}
```
