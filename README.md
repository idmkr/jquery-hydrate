# Simple jQuery input hydrating/datasyncing on value change
This handy little plugin can do a lot a things on its own. It may be what you need if you just want to automatically save input data element-by-element without reloading the page, based only on the targeted element attributes.

#Features
- Sends data on Enter keypress and focusout
- Quick data binding through html data-*
  -  If no dataAttributes option is set, all data-* associated with the input/textarea/select will be used
  -  Input value key will either be the name attribute or "value" by default
- Every form element is compatible
- Method and URL in one declaration
- Form object bound to success/error callbacks 
- Compatible with any $.ajax() options

#Usage
```
$("input").hydrate(url [,callback])
$("input").hydrate(options)
```

#Examples 

## Checkbox, radio
HTML
```html
<input type="checkbox" name="is_active" checked data-id_user="3">
```
JS
```js
$("input").hydrate("/myProcessingCode.php");

// Next checkbox click will trigger $.get("/myProcessingCode.php",{"is_active":false,"id_user":3})
```

##Any other input, textarea, or select
HTML
```html
<input class="hydrated" type="text" value="42" data-id_employee="11" data-id_price="3" data-not-sent="whatever">
<textarea class="hydrated" name="description" data-id_book="5">Lorem ipsum</textarea>
```
JS
```js
$(".hydrated").hydrate({
    // The data-attributes array will be mapped as key/value data for the request
    dataAttributes : ["id_employee","id_price"], 
    post : "/myProcessingCode.php",
    success : function (response) {
        console.log("yay data saved ! Return : "+response);
        $(this).css({border:"1px solid green"});
    }
    // Any other $.ajax() options can be used
});

// Next input change will trigger $.post("/myProcessingCode.php",{value:42, id_employee:11, id_price:3})
// Next textarea change will trigger $.post("/myProcessingCode.php",{description:"Lorem ipsum", id_book:5})
```
