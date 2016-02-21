function initBody() {
  $('body').removeClass('no-js');
}

$(document).ready(function() {
  initBody();
  $('table').addClass('tablesaw-stack');
  $('input').focus(function(){
    $(this).parents('.field').addClass('is-focused')
  });
  $('input').blur(function(){
    $(this).parents('.field').removeClass('is-focused')
  });

  var tableOfContentsToggle = 
    $('<a href="#" class="table-of-contents--toggle">Show table of contents</a>')
      .click(function(){
        $('body').toggleClass('show-table-of-contents');
        if ($('body').hasClass('show-table-of-contents')) {
          $('.table-of-contents--toggle').text('Hide table of contents');
        } else {
          $('.table-of-contents--toggle').text('Show table of contents');
        }
      });

  $('nav.nav-main ol.breadcrumbs').before(tableOfContentsToggle);

  if ($('body').hasClass('layout-article')){

    var inlineNavigation =
        "<nav role='navigation' class='inline-navigation'>" +
          "<h1>On this page:</h1>" +
          "<ul>";

    var inlineNavigationSelect = $('<select>');

    var newLine, el, title, link;

    $("main a[id]").each(function() {

      el = $(this);
      title = el.text();
      link = "#" + el.attr("id");

      newLine =
        "<li>" +
          "<a href='" + link + "'>" +
            title +
          "</a>" +
        "</li>";

      inlineNavigation += newLine;
      $(inlineNavigationSelect).append('<option value="' + el.attr("id") + '">' + title + '</option>');
    });

    inlineNavigation +=
       "</ul>" +
      "</nav>";  

    $(inlineNavigationSelect).change(function(){
      document.getElementById($(this).val()).scrollIntoView();
    });
    
    $('body').addClass('with-inline-navigation');
    $("main .wrapper").prepend(inlineNavigation);

    $("body.with-inline-navigation .inline-navigation h1").after(inlineNavigationSelect);
  }
  

  

});