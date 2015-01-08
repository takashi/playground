class ErrorsController < ActionController::Base
  # add errors that you'd like to catch
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  rescue_from ActionController::RoutingError, with: :internal_error
  rescue_from JWT::ExpiredSignature, JWT::InvalidApplication, JWT::DecodeError, JWT::InvalidTokenError, with: :verification
  rescue_from StandardError, with: :internal_error

  def not_found
    error_response :not_found
  end

  def internal_error
    error_response
  end

  def verification
    error_response :unauthorized
  end

  def show; raise exception; end

  private
  # message for program
  def type
    env['action_dispatch.exception'].class.to_s.split("::").last.underscore
  end

  # message for human
  def message
    type.humanize
  end

  def error_response(why = :internal_server_error)
    render json: {
      message: message,
      type: type
    }, status: why
  end

  def exception
    env['action_dispatch.exception']
  end
end
