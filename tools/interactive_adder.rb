require 'firebase'
require 'json'

base_uri = 'https://qualchat.firebaseio.com/'
firebase = Firebase::Client.new(base_uri)

@driver_ids = ['driver_1', 'driver_45', 'joe']
@trip_ids = ['trip_54', 'trip777', 'cocaine']
@status = ['available', '@busy']
@buildings = [ "A", "AA", "AC", "AE", "AF", "AI", "AK", "AM", "AO", "AQ", "AR", "AS", "AT", "AU", "AV", "AW", "AX", "AZT", "BB", "BC", "BCT", "BE", "BF", "BG", "BH", "BI", "BL", "D", "E", "F", "M", "N", "O", "P", "Q", "QP", "QRC", "R", "S", "T", "W", "WA", "WB", "WC", "WD", "WE", "WT" ]

def dlu_object
  { driver_id: @driver_ids[Random.rand * @driver_ids.length], lat: Random.rand * 10 + 100,
    long: Random.rand * 10 + 80, trip_id: '-JPzFH0JV3ZljRONaCYD'}
end

def ds_object
  { driver_id: @driver_ids[Random.rand * @driver_ids.length], status: @status[Random.rand * @status.length] }
end

def tr_object
  { pickup: @buildings[Random.rand * @buildings.length], dropoff: @buildings[Random.rand * @buildings.length],
    time_requested: Time.now.to_i }
end

def ta_object
  { driver_id: @driver_ids[Random.rand * @driver_ids.length], dropoff: @buildings[Random.rand * @buildings.length], pickup: @buildings[Random.rand * @buildings.length], trip_id: '-JPzAO6kgXVDFwA4Ud5Z' }
end

loop do
  puts 'Pick One'
  puts 'Driver Location Updates `dlu`'
  puts 'Driver Status           `ds`'
  puts 'Trip Requests           `tr`'
  puts 'Trip Assignments        `ta`'
  case gets.chomp
  when 'dlu'
    resp = firebase.push('driver_location_updates', dlu_object)
    puts resp.body
  when 'ds'
    resp = firebase.push('driver_statuses', ds_object)
    puts resp.body
  when 'tr'
    resp = firebase.push('trip_requests', tr_object)
    puts resp.body
  when 'ta'
    resp = firebase.push('trip_assignments', ta_object)
    puts resp.body
  end
end
