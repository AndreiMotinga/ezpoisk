class PictureSerializer
  include FastJsonapi::ObjectSerializer
  attributes :listing_id

  attribute :image_src do |obj|
    obj.main_image_url
  end
end
