class Driver
  attr_accessor :status, :location, :id, :trip_requests

  def initialize obj
    @trip_requests = []
    @id     = obj['driver_id']
    @status = obj['status']
  end

  def update_location info
    @location = Location.new info['lat'], info['lng']
  end

  def update_status info
    @status = info['status']
  end

  def valid?
    !@location.nil?
  end
end
