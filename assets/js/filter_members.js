function filter_members() {
   $('article.person').show();

   var params = Url.parseQuery();
   if (params.hasOwnProperty('locations')) {
     hidePeopleNotInOneOf(params['locations']);
   };
   if (params.hasOwnProperty('skills')) {
     hidePeopleWithoutAll('skills', params['skills']);
   };
   if (params.hasOwnProperty('interests')) {
     hidePeopleWithoutAll('interests', params['interests']);
   };
   if (params.hasOwnProperty('projects')) {
     hidePeopleWithoutAll('projects', params['projects']);
   };
};

function hidePeopleNotInOneOf(locations) {
  var locations = locations.split(',');
  $('article.person').each(function() {
    if (locations.indexOf($(this).attr('data-location')) == -1) {
      $(this).hide();
    };
  });
};

// a temorary function until we get the API to return filtered results
function hidePeopleNotActive() {
  var today = Date.now();
  // because not everyone has a start date or end date specified, the logic is a bit more complex
  $('article.person').each(function() {
    if ($(this).attr('data-end-date')) {
      var end_date = new Date($(this).attr('data-end-date'));
      if (end_date < today) {
        $(this).remove();
      };
    };
    if ($(this).attr('data-start-date')) {
      var start_date = new Date($(this).attr('data-start-date'));
      if (start_date >= today) {
        $(this).remove();
      }
    }
  });
};

function hidePeopleWithoutAll(attr_name, demanded) {
  var demanded = demanded.split(',');
  $('article.person').each(function() {
    var person = $(this);
    var has = $(this).attr('data-' + attr_name).split(',');
    demanded.forEach(function(needed) {
      if (has.indexOf(needed) == -1) {
        person.hide();
      };
    });
  });
};
