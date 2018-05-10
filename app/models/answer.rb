class Answer < ApplicationRecord
  belongs_to :question
  delegate :user, to: :question

  scope :user, ->(id) { joins(:question).where("questions.user_id": id) }
  scope :question, ->(id) { where(question_id: id) }
  scope :desc, -> { order(created_at: :desc) }
end
