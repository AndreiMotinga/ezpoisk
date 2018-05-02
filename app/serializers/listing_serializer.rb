class ListingSerializer
  include FastJsonapi::ObjectSerializer
  # TODO: add indexes
  attributes :id,
             :active,
             :text,
             :state,
             :city,
             :kind,
             :source,
             :phone,
             :email,
             :created_at,
             :updated_at

  attribute :pictures do |object|
    PictureSerializer.new(object.pictures).serializable_hash
  end

  attribute :user do |object|
    user = object.user
    {
      name:  user.name || user.email,
      avatar: user.avatar_source
    }
  end
end
