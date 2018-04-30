class PictureSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id,
             :listing_id

  attribute :images do |object|
    %I[thumb medium large original].map { |type| object.image.url(type) }
  end
end
