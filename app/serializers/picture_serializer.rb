class PictureSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id,
             :listing_id

  attribute :variants do |object|
    object.serialized_variants
  end
end
