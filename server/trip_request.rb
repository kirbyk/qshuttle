class TripRequest
  attr_accessor :id, :pickup, :dropoff, :time_requested
  def initialize obj
    # this is counting on onmessage only sending one message at a time
    # otherwise it will only take the last message (request)
    obj.each do |key, value|
      @id = key
      @pickup  = @@buildings[obj['pickup']]
      @dropoff = @@buildings[obj['dropoff']]
      @time_requested = obj['time_requested']
    end
  end

  def self.set_buildings buildings
    @@buildings = buildings
  end
end
