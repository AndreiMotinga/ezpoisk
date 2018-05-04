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

  attribute :main_image_url do |object|
    object.pictures.first&.main_image_url
  end

  attribute :pictures do |object|
    PictureSerializer.new(object.pictures).serializable_hash
  end

  attribute :user do |object|
    user = object.user
    {
      id: user.id,
      name:  user.name || user.email,
      avatar: user.avatar.url,
      provider: user.provider,
      uid: user.uid
    }
  end
end
