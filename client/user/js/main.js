$(function() {
  initSelectionList('#pickup-location .list', '#pickup-list-item');
  initSelectionList('#destination .list', '#destination-list-item');

  $('#requestShuttle').on('click', function() {
    var fbTripRequest = new Firebase('https://qualchat.firebaseio.com/trip_requests');
    fbTripRequest.push({'destination':getListVal('#destination-list-item'),
                          'start': getListVal('#pickup-list-item'),
                          'target_time': '123456',
                          'time_requested': unixTimeInSeconds()});
    });
});

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
