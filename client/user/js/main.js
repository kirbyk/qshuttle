var fbBaseUrl = 'https://qualchat.firebaseio.com/';

tripId = null;
pLat = null;
pLong = null;

$(function() {
  initSelectionList('#pickup-location .list', '#pickup-list-item');
  initSelectionList('#destination .list', '#destination-list-item');

  $('#backToMain').on('singletap', function() {
    $.UIGoBackToArticle('#main');
  });

  handleRequest();
  handleCancellation();

  var driverLocationUpdates = new Firebase(fbBaseUrl + 'driver_location_updates');
  driverLocationUpdates.on('child_added', function(childSnapshot) {
    if(tripId == childSnapshot.val()['trip_id']) {
      var dLat = childSnapshot.val()['lat'];
      var dLong = childSnapshot.val()['long'];

      var time = getTimeViaCoords(pLat, pLong, dLat, dLong);
      console.log(time);
    }
  });

  decrementFieldTimer('#pickup-time');
  decrementFieldTimer('#destination-time');

});

var handleRequest = function() {
  $("#requestShuttle").on("singletap", function() {
    var fbTripRequest = new Firebase(fbBaseUrl + 'trip_requests');
    var k = fbTripRequest.push({'dropoff':getListVal('#destination-list-item'),
                          'pickup': getListVal('#pickup-list-item'),
                          'target_time': '123456',
                          'time_requested': unixTimeInSeconds()},
                          function(error) {
                            $.UIGoToArticle("#statusPage");
                          });
    tripId = k.name();
    var dest = getListVal('#destination-list-item');
    pLat = $('#destination').find('h3:contains('+dest+')').attr('data-lat');
    pLong = $('#destination').find('h3:contains('+dest+')').attr('data-long');
    });
}

var handleCancellation = function() {
  $("#cancelShuttle").on("singletap", function() {
    var fbTripCancel = new Firebase(fbBaseUrl + 'trip_cancellations');
    fbTripCancel.push({'trip_id': tripId},
                        function(error) {
                          $.UIGoToArticle("#homepage");
                          $('#homepage .hidden').show();
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
  var val = $(elem).html().split(' ')[1];
  if(val.indexOf('your') > -1) {
    // alert('FUCK');
  }
  return val;
}

var getTimeViaCoords = function(lat1, long1, lat2, long2) {
  var url = 'http://maps.googleapis.com/maps/api/directions/json?origin='+lat1+','+long1+'&destination='+lat2+','+long2+'&sensor=false&key=AIzaSyDm7QdN3d_oboYBWnu7iQ5Drjc5XLGjOIc';
  $.get(url, function(data) {
    console.log(data['routes']['legs']['duration']['text']);
  });
}
