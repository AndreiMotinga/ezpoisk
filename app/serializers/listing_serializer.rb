class ListingSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id,
             :active,
             :text,
             :state,
             :city,
             :kind,
             :source,
             :phone,
             :email

  attribute :main_image_url do |object|
    object.pictures.first&.main_image_url
  end

  attribute :created_at do |obj|
    obj.created_at.strftime("%B %d %Y %H:%M")
  end

  attribute :pictures do |object|
    PictureSerializer.new(object.pictures).serializable_hash
  end

  attribute :user do |object|
    # TODO switch to serialiser
    user = object.user
    {
      id: user.id,
      name:  user.name || user.email,
      avatar: user.avatar.url(:thumb),
      provider: user.provider,
      uid: user.uid
    }
  end

  attribute :display_kind do |obj|
    case obj.kind
    when "housing" then "недвижимость"
    when "job" then "работа"
    when "sale" then "продажи"
    when "service" then "услуги"
    when "parcel" then "посылки"
    when "meetup" then "знакомства"
    else
      obj.kind
    end
  end
end
