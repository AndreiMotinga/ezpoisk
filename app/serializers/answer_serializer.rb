class AnswerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :text

  attribute :question do |obj|
    obj.question
  end

  attribute :user do |obj|
    obj.user
  end
end
