class UserInListingSerializer
  include FastJsonapi::ObjectSerializer
  attributes :avatar_source

  attribute :display_name do |object|
    object.name || object.email
  end
end
