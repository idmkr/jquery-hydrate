/*
	Gaël DEBOST / IDMKR
	jQuery Hydrate v.0.1
	Compatible with jQuery > 1.9.0
*/
;(function ($) {
	//Feature detection https://github.com/malsup/form/blob/master/jquery.form.js#L68
	var canUseFileAPI = ( $("<input type='file'/>").get(0).files !== undefined ) &&
				  ( feature.formdata = window.FormData !== undefined );

	$.fn.hydrate = function (options,callback) {
		var filterData = function ($e,filter) {
			var data = {};
			$.each($e.data(),function (k,v) { 
				if( !filter || 
					( $.isArray(filter) && $.inArray(k,filter) != -1) || 
					( $.isFunction(filter) && $.proxy(filter,$e[0],k,v)() ) || 
					( $.type(filter) == "regexp" && filter.test(k) ) || 
					( $.type(filter) == "string" && filter == k ) 
				)
					data[k] = v;
			});
			return data;
		}

		var opts = $.extend({
			cache: false,
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
					$.each(opts, function (key,option) {

						if( key.match( /^post|get$/ ) )
							$.extend(o,{ method : key, url : option });

						else if( key.match( /dataFilter/i ) ) {
							var $el = key == "dataFilter" ? $t : $parent;
							$.extend( o.data, option ? filterData($el,option) : $el.data() );
						}

						else if( key.match( /^success|error|beforeSend|complete$/ ) 
								 && typeof option == "function" )
							o[key] = $.proxy(option,$t[0]);

						else if( !key.match( /^parent|uploadProgress$/ ) )
							o[key] = option;
					});
				} 
				else {
					o.url = opts;
					o.success = $.proxy(callback,$t[0]);
					$.extend(o.data,$t.data());
				}

				// File inputs
				// https://github.com/malsup/form/blob/master/jquery.form.js#L288
				// https://github.com/malsup/form/commit/588306aedba1de01388032d5f42a60159eea9228#commitcomment-2180219
				if( $t.is("input[type=file]") && $t.val() ) {
					if(!canUseFileAPI) {
						console.log("Images won't be send with jquery.hydrate, as XMLHttpRequest advanced features seems  unavailable. See http://caniuse.com/#search=FormData");
						return false;
					}

					var formData = new FormData();

					$.extend(o, {
						method : "POST",
						contentType: false,
            			processData: false,
            			data : $.each(o.data, function (k,v) { formData.append(k,v); })
					});

					if ($.isFunction(opts.uploadProgress)) {
					    // workaround because jqXHR does not expose upload property
			           o.xhr = function() {
			                var xhr = $.ajaxSettings.xhr();
			                if (xhr.upload) {
			                    xhr.upload.addEventListener('progress', function(event) {
			                        var percent = 0;
			                        var position = event.loaded || event.position; /*event.position is deprecated*/
			                        var total = event.total;
			                        if (event.lengthComputable) {
			                            percent = Math.ceil(position / total * 100);
			                        }
			                        opts.uploadProgress(event, position, total, percent);
			                    }, false);
			                }
			                return xhr;
			            };
			        }
				}

				$.ajax(o);
			}
		})
	}
})(jQuery);
