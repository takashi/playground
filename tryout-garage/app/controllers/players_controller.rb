class PlayersController < ApiController
  include Garage::RestfulActions

  def require_resources
    @resources = Player.all
  end
end
