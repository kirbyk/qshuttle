class Building
  def initialize obj
    @lat, @lng = obj['bldgLatitude'], obj['bldgLongitude']
    @code = obj['blld']
  end
end
