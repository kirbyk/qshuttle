require 'firebase'
require 'json'

base_uri = 'https://qualchat.firebaseio.com/'
firebase = Firebase::Client.new(base_uri)

puts 'clearing firebase'

firebase.set('/', {})

puts 'buildings'

buildings_file = File.open('data/buildings.json', 'r')
buildings_raw =  buildings_file.read
buildings = JSON.parse(buildings_raw)

buildings.each do |building|
  response = firebase.push('buildings', building)
  puts response.body
end

puts 'driver_location_updates'

driver_location_updates_file = File.open('data/driver_location_updates.json', 'r')
driver_location_updates_raw =  driver_location_updates_file.read
driver_location_updates = JSON.parse(driver_location_updates_raw)

driver_location_updates.each do |driver_location_update|
  response = firebase.push('driver_location_updates', driver_location_update)
  puts response.body
end

puts 'driver_routes'

driver_routes_file = File.open('data/driver_routes.json', 'r')
driver_routes_raw =  driver_routes_file.read
driver_routes = JSON.parse(driver_routes_raw)

driver_routes.each do |driver_route|
  response = firebase.push('driver_routes', driver_route)
  puts response.body
end

puts 'driver_statuses'

driver_statuses_file = File.open('data/driver_statuses.json', 'r')
driver_statuses_raw =  driver_statuses_file.read
driver_statuses = JSON.parse(driver_statuses_raw)

driver_statuses.each do |driver_status|
  response = firebase.push('driver_statuses', driver_status)
  puts response.body
end

puts 'trip_requests'

trip_requests_file = File.open('data/trip_requests.json', 'r')
trip_requests_raw =  trip_requests_file.read
trip_requests = JSON.parse(trip_requests_raw)

trip_requests.each do |trip_request|
  response = firebase.push('trip_requests', trip_request)
  puts response.body
end
