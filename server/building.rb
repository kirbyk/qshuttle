class Building
  attr_accessor :location, :code
  def initialize obj
    @location = Location.new @lng = obj['bldgLatitude'], obj['bldgLongitude']
    @code = obj['blld']
  end
end
