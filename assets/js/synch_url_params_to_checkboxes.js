 function clear_checkboxes() {
   $('input[type="checkbox"][param-key]').attr("checked", false);
 };

 function set_checkboxes_to_url_params() {
   clear_checkboxes();
   var params = Url.parseQuery();
   for (category in params) {
     params[category].split(',').forEach(function(val){
       var checkbox = $('input[type="checkbox"][param-key="' + category + '"][name="' + val+ '"]');
       checkbox.prop('checked', true);
     });
   };
 };

 function set_url_params_to_checkboxes() {
   var params = {};
   $('input[type="checkbox"][param-key]').each(function(el){
      params[$(this).attr('param-key')] = [];
   });
   $('input[type="checkbox"][param-key]').each(function(el){
     if ($(this).prop("checked")) {
       params[$(this).attr('param-key')].push($(this).attr('name'));
     };
   });
   Object.keys(params).forEach(function (k){
     if (params[k].length) {
       Url.updateSearchParam(k, params[k].join(','));
     } else {
       Url.updateSearchParam(k);
     }
   });

 };
