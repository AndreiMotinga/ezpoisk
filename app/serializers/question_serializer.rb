class QuestionSerializer
  include FastJsonapi::ObjectSerializer
  attributes  :title, :text

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
