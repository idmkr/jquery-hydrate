# Simple jQuery hydrating/datasyncing plugin
This handy little plugin can do a lot a things on its own. It may be what you need if you just want to automatically save input data element-by-element without reloading the page, based only on the targeted element attributes. The parent form data-* can also be sent along with the other parameters.

#Features
- Sends data on Enter keypress and focusout
- Quick data binding through html data-*
  -  If no dataFilter option is set, all data-* associated with the input/textarea/select will be used
  -  Input value key will either be the name attribute or "value" by default
- Also sends parent form data-* by default ( customizable with "parent" and filterable with "parentDataFilter" options )
- Every form element is compatible
- Method and URL in one declaration
- Form object bound to success/error callbacks 
- Compatible with any $.ajax() options

#Usage
```js
$("input").hydrate(url [,callback])
$("input").hydrate(options)
```

#Options
```js
$("input").hydrate({
  url|get|post => string,                             // Mandatory
  dataFilter   => array|function|regexp|string,       // Any type of filter. Default : false
  parent       => selector|jQuery ,                   // The parent element which contains extra data-*
  parentDataFilter   => array|function|regexp|string, // Any type of filter. Default : false
  // Any other $.ajax() may be used here
})
```

#Examples 

## Checkbox, radio
HTML
```html
<form data-week_day="monday">
  <input type="checkbox" name="is_busy" checked data-id_user="3">
</form>
```
JS
```js
$("input").hydrate("/myProcessingCode.php");

// Next checkbox click will trigger $.get("/myProcessingCode.php",{ "is_busy":false, "id_user":3, "week_day":"monday" })
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
