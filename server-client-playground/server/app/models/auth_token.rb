class AuthToken
  def self.encode(user_id, exp=24.hours.from_now.to_i)
    claim = {
      iss: Rails.application.secrets.application_id,
      exp: exp,
      user_id: user_id
    }
    JWT.encode(claim, Rails.application.secrets.application_secret)
  end

  def self.decode!(jwt)
    payload, header = JWT.decode(jwt, Rails.application.secrets.application_secret)
    if payload['exp'] < Time.now.to_i
      raise JWT::ExpiredSignature.new("Signature has expired")
    elsif payload['iss'] != Rails.application.secrets.application_id
      raise JWT::InvalidApplication.new("Wrong application has passed")
    end
    payload
  end
end
