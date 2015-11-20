# Simple jQuery hydrating/datasyncing plugin
This handy little plugin can do a lot a things on its own. It may be what you need if you just want to automatically save input data element-by-element without reloading the page, based only on the targeted element data-* attributes. The parent form data-* can also be sent along with the other parameters. Filter options and ajax options make it fully customizable.
Unlike the famous jquery.form which can fully upgrade a html form to an ajax form, this plugin goal is to get rid of a submit button, or even a form tag. While it's called "hydrating", this plugin does not deal with models. It just sends attributes data on change !
It has not been fully tested, and is only used by me for a specific usage at this time. Any improvement/help would be welcome.

#Features
- Sends data in background on Enter keypress and focusout
- Quick data binding & filtering through html data-*
  -  If no dataFilter option is set, all data-* associated with the input/textarea/select will be used
  -  Input value key will either be the name attribute or "value" by default
- Also sends parent form data-* by default ( customizable with "parent" and filterable with "parentDataFilter" options )
- Every form element should be compatible
- Method and URL in one declaration
- Compatible with any $.ajax() options. 
  - Events functions : "this" refers as the current form input that has changed
  - dataFilter() : the function has been entirely replaced, to fully reflect the plugin intention. Here data refers to filtering the  data-* attributes that will be sent with each onchange ajax request. 

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
  parent       => string|jQuery ,                     // The parent element selector which contains extra data-*. Default : "form"
  parentDataFilter   => array|function|regexp|string, // Any type of filter. Default : false
  // Any other $.ajax() may be used here
})
```

#Examples 

## No options
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

## Multiple inputs, no form
HTML
```html
<input class="hydrated" type="text" value="42" data-id_author="11" data-price="39.99" data-not-sent="whatever">
<textarea class="hydrated" name="description" data-id_book="5">Lorem ipsum</textarea>
```
JS
```js
$(".hydrated").hydrate({
    // The data-attributes array will be mapped as key/value data for the request
    dataFilter : ["id_employee","id_price"], 
    post : "/myProcessingCode.php",
    success : function (response) {
        console.log("yay data saved ! Return : "+response);
        $(this).css({border:"1px solid green"});
    }
    // Any other $.ajax() options can be used
});

// Next input change will trigger $.post("/myProcessingCode.php",{value:42, id_author:11, id_price:39.99})
// Next textarea change will trigger $.post("/myProcessingCode.php",{description:"Lorem ipsum", id_book:5})
```
