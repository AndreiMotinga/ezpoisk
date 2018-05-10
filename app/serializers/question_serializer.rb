class QuestionSerializer
  include FastJsonapi::ObjectSerializer
  attributes  :title, :text
end
