class TripRequest
  def initialize obj
    @pickup =  @@buildings[obj['pickup']]
    @dropoff = @@buildings[obj['dropoff']]
    @time_requested = obj['time_requested']
  end

  def self.set_buildings buildings
    @@buildings = buildings
  end
end
