(function ($) {
	$.fn.hydrate = function (options,callback) {
		var filterData = function ($e,filter) {
			var data = {};
			$.each($e.data(),function (k,v) { 
				if( !filter || 
					( $.isArray(filter) && $.inArray(k,filter) != -1) || 
					( $.isFunction(filter) && $.proxy(filter,$e,k)() ) || 
					( $.type(filter) == "regexp" && filter.test(k) ) || 
					( $.type(filter) == "string" && filter == k ) 
				)
					data[k] = v;
			});
			return data;
		}

		var opts = $.extend({
			dataFilter : false,
			parent : "form",
			parentDataFilter : false
		},options);

		$(this).bind({
			keyup : function (e) { e.keyCode === 13 && $(this).blur() },
			change :function ()  { 
				var $t = $(this), 
					$parent = $t.parents(opts.parent), 
					o = { data : {} };
				
				o.data[$t.attr("name") || "value"] = 
					$t.is(':checkbox,:radio') ? ( $t.val() || $t[0].checked ) : $t.val();

				if(typeof opts == "object") {
					$.each(opts, function (k,v) {

						if( k.match( /post|get/ ) )
							o.method = k, o.url = v;

						else if( k == "dataFilter" )
							$.extend( o.data, v ? filterData($t,v) : $t.data() );

						else if( k.match( /success|error/ ) && typeof v == "function" )
							o[k]=$.proxy(v,$t[0]);

						else if( k == "parentDataFilter" && opts.parent)
							$.extend( o.data, v ? filterData($parent,v) : $parent.data() );

						else if( !k.match( /parent/ ) )
							o[k] = v;
					});
				} 
				else {
					o.url = opts;
					o.success = $.proxy(callback,$t[0]);
					$.extend(o.data,$t.data());
				}

				$.ajax(o);
			}
		})
	}
})(jQuery)
