class QuestionSerializer
  include FastJsonapi::ObjectSerializer
  attributes  :title, :text

  attribute :user do |obj|
    obj.user
  end
end
