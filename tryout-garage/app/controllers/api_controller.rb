class ApiController < ApplicationController
  include Garage::ControllerHelper

  def current_resource_owner
    @current_resource_owner ||= Player.find(resource_owner_id) if resource_owner_id
  end

  def resource_owner_exists?(resource_owner_id)
    Player.exists?(resource_owner_id)
  end
end