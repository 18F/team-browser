function filter_members() {
   $('article.person').show();
   hidePeopleNotActive();
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

  $('article.person').each(function() {
    if ($(this).attr('data-end-date')) {
      if ($(this).attr('data-end-date') < today);
      $(this).hide();
    };
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
