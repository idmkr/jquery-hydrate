# jQuery very simple input auto datasync on change
Very simple jquery plugin for handling automatic input data hydrating on value change.

#Features
- Sends data on Enter keypress and focusout
- Quick data binding through html data-*
  -  If no dataAttributes option is set, all data-* associated with the input/textarea/select will be used
  -  Input value key will either be the name attribute or "value" by default
-  Every form input type handled
- Method and url in one declaration
- Form object bound to success/error callbacks 

#Usage
```
$("input").hydrate(url [,callback])
$("input").hydrate(options)
```

#Examples 

##HTML
```
<input type="checkbox" name="is_active" checked data-id_user="3">
```
##JS
```
$("input").hydrate("/myProcessingCode.php");

// Next checkbox click will trigger $.get("/myProcessingCode.php",{"is_active":false,"id_user":3})
```

##HTML
```
<input type="text" value="42" data-id_employee="11" data-id_price="3" data-not-sent="whatever">
```
##JS
```
$("input").hydrate({
    // The data-attributes array will be mapped as key/value data for the request
    dataAttributes : ["id_employee","id_price"],
    post : "/myProcessingCode.php",
    success : function (response) {
        console.log("yay data saved ! Return : "+response);
        $(this).css({border:"1px solid green"});
    }
    // Any other $.ajax() options can be used
});

// Next input change will trigger $.post("/myProcessingCode.php",{value:42,id_employee:11,id_price:3})
```

##The plugin code :
```
$.fn.hydrate = function (options,callback) {
	$(this).bind({
		keyup : function (e) { e.keyCode === 13 && $(this).blur() },
		change :function ()  { 
			var $t = $(this), o = { data : {} }, hasData = false;
			
			o.data[$t.attr("name") || "value"] = 
				$t.is(':checkbox,:radio') ? ( $t.attr("value") || $t[0].checked ) : $t.val();

			typeof options == "object" && $.each(options, function (k,v) {
				if( k.match(/post|get/i) )
					o.method = k, o.url = v;
				else if( k.match( /dataattributes/i ) )
					$.map(v, function (d) { o.data[d] = $t.data(d) }) && hasData = true;
				else if( k.match( /success|error/i ) && typeof v == "function" )
					o[k]=$.proxy(v,$t[0]);
				else 
					o[k] = v;
			}) || o.url = options;

			typeof callback == "function" && o.success = $.proxy(callback,$t[0]);

			hasData || $.extend(o.data,$t.data());

			$.ajax(o);
		}
	})
}
```
