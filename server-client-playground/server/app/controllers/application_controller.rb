class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  before_action :validate_token

  private
  def validate_token
    authorization = request.headers['Authorization']
    raise JWT::InvalidTokenError if authorization.nil?
    token = request.headers['Authorization'].split(' ').last
    AuthToken.decode!(token)

    # [TODO] user verification
  end
end
