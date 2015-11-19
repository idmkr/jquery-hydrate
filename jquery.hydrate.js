
(function ($) {
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
  			}) || (
  				o.url = options,
  				typeof callback == "function" && o.success = $.proxy(callback,$t[0])
  			);
  			
  			hasData || $.extend(o.data,$t.data());
  
  			$.ajax(o);
  		}
  	})
  }
})(jQuery)
