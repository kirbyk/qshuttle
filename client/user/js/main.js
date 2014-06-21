$(function() {
  initSelectionList('#pickup-location .list', '#pickup-list-item');
  initSelectionList('#destination .list', '#destination-list-item');

  $('#backToMain').on('singletap', function() {
    $.UIGoBackToArticle('#main');
  });

  $("#requestShuttle").on("singletap", function() {
    var fbTripRequest = new Firebase('https://qualchat.firebaseio.com/trip_requests');
    fbTripRequest.push({'destination':getListVal('#destination-list-item'),
                          'start': getListVal('#pickup-list-item'),
                          'target_time': '123456',
                          'time_requested': unixTimeInSeconds()},
                          function(error) {
                            $.UIGoToArticle("#statusPage");
                          });
    });

    decrementFieldTimer('#pickup-time');
    decrementFieldTimer('#destination-time');

});

var decrementFieldTimer = function(elem) {
    var countDown = function() {
      var curr = parseInt($(elem).html());
      $(elem).html(curr-1);
    }
    setInterval(countDown, 60000);
}

var initSelectionList = function(elem, list) {
  $(elem).UISelectList({
    callback: function() {
      $(list).html($(this).text());
    }
  });
}

var unixTimeInSeconds = function() {
  return Math.round(new Date().getTime() / 1000);
}

var getListVal = function(elem) {
  var val = $(elem).html();
  if(val.indexOf('Select') > -1) {
    // alert('FUCK');
  }
  return val;
}
