function filter_members() {
   $('.no-results').hide();
   $('article.person').show();

   // This can be attached to a checkbox in the future, but for now, will filter out all former members and those who have not yet started
   hidePeopleWhoHaveNotStarted();
   hidePeopleWhoHaveLeft();

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

   var resultsCount = $('article.person').filter(":visible").length;

   // show no results message if there are no results
   if (resultsCount == 0) {
     $('.no-results').show();
   }
};

function hidePeopleNotInOneOf(locations) {
  var locations = locations.split(',');
  $('article.person').each(function() {
    if (locations.indexOf($(this).attr('data-location')) == -1) {
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

// temporary functions to hide people who are not current employees
function hidePeopleWhoHaveNotStarted() {
  $(".has-not-started").remove();
};

function hidePeopleWhoHaveLeft() {
  $(".has-left").remove();
};
