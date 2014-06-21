class Driver
  def initialize info
    @status = info['status']
  end

  def update_location info
    @lat = info['lat']
    @lng = info['lng']
  end

  def update_status info
    @status = info['status']
  end
end
