Rails.configuration.exceptions_app = -> (env) { ErrorsController.action(:show).call(env) }
