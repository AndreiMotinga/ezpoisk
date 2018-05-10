class QuestionShowSerializer
  include FastJsonapi::ObjectSerializer
  attributes  :title

  attribute :user do |object|
    # TODO switch to serialiser
    user = object.user
    {
      id: user.id,
      name:  user.name || user.email,
      avatar: user.avatar.url(:thumb),
      provider: user.provider,
      uid: user.uid,
      short_bio: user.short_bio
    }
  end

  attribute :answers do |obj|
    AnswerSerializer.new(obj.answers).serializable_hash
  end
end
