(function ($) {
	$.fn.hydrate = function (options,callback) {
		var filterData = function ($e,filter) {
			var data = {};
			$.each($e.data(),function (k,v) { 
				if(!filter || $.inArray(k,filter) != -1)
					data[k] = v;
			});
			return data;
		}
		$.each(["data","withFormData"],function (t) { options[t] ? t : [] })

		$(this).bind({
			keyup : function (e) { e.keyCode === 13 && $(this).blur() },
			change :function ()  { 
				var $t = $(this), 
					$form = $t.parents("form"), 
					o = { data : {} };
				
				o.data[$t.attr("name") || "value"] = 
					$t.is(':checkbox,:radio') ? ( $t.attr("value") || $t[0].checked ) : $t.val();

				$form[0] && $.extend(o.data,filterData($form,options.withFormData));

				if(typeof options == "object") {

					$.each(options, function (k,v) {
						if( k.match( /post|get/ ) )
							o.method = k, o.url = v;
						else if( k == "data" )
							$.extend(o.data, $.isArray(v) ? filterData($t,v) : $t.data());
						else if( k.match( /success|error/ ) && typeof v == "function" )
							o[k]=$.proxy(v,$t[0]);
						else 
							o[k] = v;
					});
				} 
				else {
					o.url = options;
					o.success = $.proxy(callback,$t[0]);
					$.extend(o.data,$t.data());
				}

				$.ajax(o);
			}
		})
	}
})(jQuery)
