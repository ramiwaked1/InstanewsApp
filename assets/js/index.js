$body = $("body");

$(document).on({
  ajaxStart: function() {
    $body.addClass("loading");
  },
  ajaxStop: function() {
    $body.removeClass("loading");
  }
});

$('#dropdown').change(function() {
  $('.wrapper').empty();
  var k = $('select#dropdown option:checked').val();
  var url = "https://api.nytimes.com/svc/topstories/v2/" + k + ".json";
  url += '?' + $.param({
    'api-key': "5199e7c5b8c441d2b03642a7495e3c1a",
    'callback': "data"
  });
  $.ajax({
    url: url,
    method: 'GET',
  }).done(function(result) {
    for (var i = 0; i < 12; i++) {
      var title = (result.results[i].title);
      var url = (result.results[i].url);
      var multimedia = (result.results[i].multimedia[4].url);
      var $div = $("<div></div>");
      var $p = $("<p></p>");
      var $a = $("<a></a>");
      $a.attr('href', url);
      $p.append($a);
      $a.append(title);
      $div.append($p);
      $div.css('background-image', 'url(' + multimedia + ')');
      $div.addClass('image');
      $(".wrapper").append($div);
    }
  }).fail(function(err) {
    throw err;
  });
});
