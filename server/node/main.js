var Firebase = require('firebase');
var qshuttle = new Firebase('https://qualchat.firebaseio.com/');


var drivers = {};

qshuttle.child('driver_statuses').on( 'child_added', function(snapshot){
  var driver_status = snapshot.val();
  var driver_id = driver_status['driver_id'];
  if (typeof drivers[driver_id] === 'undefined'){
    drivers[driver_id] = {};
  }
  drivers[driver_id]['status'] = driver_status['status'];
  console.log(driver_status);
});

qshuttle.child('driver_location_updates').on( 'child_added', function(snapshot){
  var driver_location_update = snapshot.val();
  var driver_id = driver_location_update['driver_id'];
  if (typeof drivers[driver_id] === 'undefined'){
    drivers[driver_id] = {};
    // we don't have data for their status, so assume busy
    drivers[driver_id]['status'] = 'busy';
  }
  drivers[driver_id]['lat'] = driver_location_update['lat'];
  drivers[driver_id]['lng'] = driver_location_update['lng'];
  console.log(driver_location_update);
});

qshuttle.child('trip_requests').on( 'child_added', function(snapshot){
  var trip_request = snapshot.val();
  var avail_drivers = [];
  Object.keys(drivers).forEach( function(key){
    if (drivers[key]['status'] !== 'busy'){
      avail_drivers.push(drivers[key]);
    }
  });
  var best_driver = get_best_driver(avail_drivers, trip_request);
  send_trip_assignment(best_driver, trip_request);
  console.log(trip_request);
});

function get_best_driver(drivers, trip_request){
  return drivers[0];
}

function send_trip_assignment(best_driver, trip_request){
  ;
}
