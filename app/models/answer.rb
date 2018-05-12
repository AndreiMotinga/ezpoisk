class Answer < ApplicationRecord
  belongs_to :question
  belongs_to :user

  scope :desc, -> { order(created_at: :desc) }

  validates_presence_of :user_id
  validates_presence_of :question_id
  validates_uniqueness_of :user_id, scope: :question_id
end
