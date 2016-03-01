function filter_members() {
   var params = Url.parseQuery();
   $('div.team-members').show();
   if (params.hasOwnProperty('locations')) {
     var locations = params['locations'].split(',');
     $('div.team-members').each(function() {
       if (locations.indexOf($(this).attr('characteristics-location')) == -1) {
         $(this).hide();
       }
     });
   };
};
