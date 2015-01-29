class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  before_action :validate_token

  private
  def validate_token
    token = request.headers['Authorization'].split(' ').last
    raise JWT::InvalidTokenError if token.nil?
    AuthToken.decode!(token)

    # [TODO] user verification
  end
end
