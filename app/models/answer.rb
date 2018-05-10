class Answer < ApplicationRecord
  belongs_to :question
  belongs_to :user

  scope :desc, -> { order(created_at: :desc) }

  validates_uniqueness_of :user_id, :scope => [:question_id]
end
