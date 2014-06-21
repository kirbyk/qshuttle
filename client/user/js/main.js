var fbBaseUrl = 'https://qualchat.firebaseio.com/';

tripId = null;
driverId = null;

$(function() {
  initSelectionList('#pickup-location .list', '#pickup-list-item');
  initSelectionList('#destination .list', '#destination-list-item');

  $('#backToMain').on('singletap', function() {
    $.UIGoBackToArticle('#main');
  });

  handleRequest();
  handleCancellation();

  var tripAssignments = new Firebase(fbBaseUrl + 'trip_assignments');
  tripAssignments.on('child_added', function(childSnapshot) {
    if(tripId == childSnapshot.val()['trip_id']) {
      driverId = childSnapshot.val()['driver_id'];
    }
  });

  decrementFieldTimer('#pickup-time');
  decrementFieldTimer('#destination-time');

});

var handleRequest = function() {
  $("#requestShuttle").on("singletap", function() {
    var fbTripRequest = new Firebase(fbBaseUrl + 'trip_requests');
    var k = fbTripRequest.push({'destination':getListVal('#destination-list-item'),
                          'start': getListVal('#pickup-list-item'),
                          'target_time': '123456',
                          'time_requested': unixTimeInSeconds()},
                          function(error) {
                            $.UIGoToArticle("#statusPage");
                          });
    tripId = k.name();
    });
}

var handleCancellation = function() {
  $("#cancelShuttle").on("singletap", function() {
    var fbTripCancel = new Firebase(fbBaseUrl + 'trip_cancellations');
    fbTripCancel.push({'trip_id': tripId},
                        function(error) {
                          $.UIGoToArticle("#statusPage");
                        });
    });
}

var decrementFieldTimer = function(elem) {
    var countDown = function() {
      var curr = parseInt($(elem).html());
      if(curr > 0) {
        $(elem).html(curr-1);
      }
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
