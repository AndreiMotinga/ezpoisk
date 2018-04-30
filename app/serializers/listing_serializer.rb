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
    object.pictures.map do |pic|
      result = %I[thumb medium large original].each_with_object({}) do |t, res|
        res[t] = pic.image.url(t)
      end
      result[:source] = pic.source
      result
    end
  end
end
