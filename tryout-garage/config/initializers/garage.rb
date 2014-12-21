Garage.configure do
  rescue_error = false
end

Garage::TokenScope.configure do
end

Doorkeeper.configure do
  orm :active_record

  resource_owner_authenticator do
    Player.find_by_id(session[:user_id]) || redirect_to(new_session_url)
  end
  default_scopes :public
  optional_scopes *Garage::TokenScope.optional_scopes
end

ActiveSupport::Notifications.subscribe "garage.request" do |name, start, finish, id, payload|
  if payload[:token].application_id
    payload[:controller].response.headers['Application-Id'] = payload[:token].application_id
  end
end