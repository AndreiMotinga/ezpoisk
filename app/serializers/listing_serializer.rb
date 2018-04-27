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

  attribute :images do |object|
    object.pictures.pluck(:source)
  end
end
