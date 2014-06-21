require 'rubygems'
require 'bundler'

Bundler.require

require './driver'

drivers = Hash.new

def get_drivers drivers_obj
  drivers_obj.each do |key, value|
    if !drivers[key].nil?
      drivers[key].update_status value
    else
      drivers[key] = Driver.new value
    end
  end
end

buildings = Hash.new

def get_buildings buildings_obj
  buildings_obj.each do |key, value|
    building = Building.new value
    buildings[building.code] = building
  end
  TripRequest.set_buildings buildings
end

def get_best_drivers request
  return drivers.first
end

f = RestFirebase.new :site => 'https://qualchat.firebaseio.com/',
                     :log_method => method(:puts),
                     :auth => false

@reconnect = true

# As the server, we care about
# driver_status
# driver_location_updates
# trip_requests

get_drivers( f.get('driver_statuses') )
get_buildings( f.get('buildings') )

loop do

  ds  = f.event_source 'driver_statuses'
  dlu = f.event_source 'driver_location_updates'
  tr  = f.event_source 'trip_requests'

  ds.onmessage do |event, data, sock|
    driver_id = data['driver_id']
    if !drivers[driver_id].nil?
      drivers[driver_id].update_status data
    end
  end

  dlu.onmessage do |event, data, sock|
    driver_id = data['driver_id']
    if !drivers[driver_id].nil?
      drivers[driver_id].update_location data
    end
  end

  tr.onmessage do |event, data, sock|
    request = TripRequest.new data.first
    preferred_drivers = get_best_drivers request
    send_trip_assignment request, preferred_drivers.first
  end

end
