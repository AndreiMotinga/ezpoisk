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

  has_many :pictures

  attribute :images do |object|
    object.pictures.map { |pic| pic.image.url }
  end
end
