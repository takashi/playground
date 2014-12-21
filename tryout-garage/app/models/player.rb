class Player < ActiveRecord::Base
  include Garage::Representer

  property :id
  property :name
  property :job
  property :life

  def self.build_permissions(perms, other, target)
    perms.permits! :read
  end
end
