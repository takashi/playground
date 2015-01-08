# this will removed when https://github.com/progrium/ruby-jwt/issues/47 is closed.
module JWT
  class ExpiredSignature < StandardError; end
  class InvalidApplication < StandardError; end
  class InvalidTokenError < StandardError; end
end
