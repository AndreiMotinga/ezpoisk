class AnswerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :text

  attribute :updated_at do |obj|
    obj.created_at.strftime("%B %d %Y %H:%M")
  end

  attribute :question do |obj|
    obj.question
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
end
