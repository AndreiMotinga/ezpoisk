class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :short_bio, :about

  attribute :avatar_src do |obj|
    obj.avatar.url(:thumb)
  end
end
