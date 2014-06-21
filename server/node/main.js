var Firebase = require('firebase');
var qshuttle = new Firebase('https://qualchat.firebaseio.com/');


var drivers = {};
var buildings = {};

qshuttle.child('buildings').on( 'child_added', function(snapshot){
  var building = snapshot.val();
  var building_code = building['blld'];
  if (typeof buildings[building_code] === 'undefined'){
    buildings[building_code] = building;
    buildings[building_code]['lat'] = building['buildingLatitude'];
    buildings[building_code]['lng'] = building['buildingLongitude'];
  }
  console.log(building);
});

qshuttle.child('driver_statuses').on( 'child_added', function(snapshot){
  var driver_status = snapshot.val();
  var driver_id = driver_status['driver_id'];
  if (typeof drivers[driver_id] === 'undefined'){
    drivers[driver_id] = {};
    drivers[driver_id]['queue'] = [];
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
    drivers[driver_id]['queue'] = [];
  }
  drivers[driver_id]['lat'] = driver_location_update['lat'];
  drivers[driver_id]['lng'] = driver_location_update['lng'];
  console.log(driver_location_update);
});

qshuttle.child('trip_cancellations').on( 'child_added', function(snapshot){
  var trip_id = snapshot.val()['trip_id'];
  var driver_keys = Object.keys(drivers);
  driver_keys.some( function( driver_key){
    var driver = drivers[driver_key];
    return driver['queue'].some( function( trip_request, i ){
      if (trip_request['trip_id'] === trip_id){
        // javascript encantation to remove an element from an array
        driver[queue].splice(i, 1);
        send_trip_assignment( driver );
      }
    });
  });
});

qshuttle.child('trip_requests').on( 'child_added', function(snapshot){
  var trip_request = snapshot.val();
  var avail_drivers = [];
  Object.keys(drivers).forEach( function(driver_key){
    var driver = drivers[driver_key];
    console.log(driver);
    if (driver['status'] !== 'busy'){
      avail_drivers.push(driver);
    }
  });
  var best_driver = get_best_driver(avail_drivers, trip_request);
  if (typeof best_driver !== 'undefined'){
    best_driver['queue'].push(trip_request);
    send_trip_assignment(best_driver);
  } else {
    console.log("No Available Drivers");
    console.log(avail_drivers.length);
  }
  console.log(trip_request);
});

function get_best_driver(drivers, trip_request){
  //trip_request['pickup']['lat'];
  //trip_request['dropoff']['lng'];
  var driver_keys = Object.keys(drivers);
  var best_driver = drivers[driver_keys[0]];
  var least_size = 999;
  driver_keys.forEach( function (driver_key){
    var driver = drivers[driver_key];
    if (driver['queue'].length < least_size ){
      best_driver = driver;
    }
  });
  return best_driver;
}

function send_trip_assignment(driver){
  var current_trip_request = driver['queue'].splice(0,1);
  driver['status'] = 'busy';
  console.log("setting driver to busy");
  console.log(driver['lat']);
  //qshuttle.send...
}
