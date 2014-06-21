require 'rubygems'
require 'bundler'

Bundler.require

require './driver'
require './location'
require './building'
require './trip_request'

@drivers = Hash.new

def get_drivers drivers_obj
  drivers_obj.each do |key, value|
    driver_id = value['driver_id']
    if !@drivers[driver_id].nil?
      @drivers[driver_id].update_status value
    else
      @drivers[driver_id] = Driver.new value
    end
  end
end

@buildings = Hash.new

def get_buildings buildings_obj
  buildings_obj.each do |key, value|
    building = Building.new value
    @buildings[building.code] = building
  end
  TripRequest.set_buildings @buildings
end

def get_best_drivers request
  return @drivers.first
end

def send_driver_assignment request, driver
  # TODO f.put blah blah
end

def print_status
  puts "#### DRIVERS ####"
  @drivers.each do |id, driver|
    puts driver.id
    puts "\t#{driver.status} has #{driver.trip_requests.size} requests"
  end
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

last_log = Time.now

loop do
  if Time.now - last_log > 5
    print_status
    last_log = Time.now
  end
  ds  = f.event_source 'driver_statuses'
  dlu = f.event_source 'driver_location_updates'
  tr  = f.event_source 'trip_requests'

  ds.onmessage do |event, data, sock|
    data.each do |key, value|
      driver_id = value['driver_id']
      if !@drivers[driver_id].nil?
        @drivers[driver_id].update_status data
      end
    end
  end

  dlu.onmessage do |event, data, sock|
    data.each do |key, value|
      driver_id = value['driver_id']
      if !@drivers[driver_id].nil?
        @drivers[driver_id].update_location value
      end
    end
  end

  tr.onmessage do |event, data, sock|
    request = TripRequest.new data
    preferred_drivers = get_best_drivers request
    send_trip_assignment request, preferred_drivers.first
  end
end
