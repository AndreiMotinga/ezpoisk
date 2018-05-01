class PictureSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id,
             :listing_id

  attribute :images do |object|
    object.serialized_images
  end
end
