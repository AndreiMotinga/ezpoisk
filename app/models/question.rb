class Question < ApplicationRecord
  belongs_to :user
  has_many :answers

  scope :user, ->(id) { where(user_id: id) }
  scope :desc, -> { order(created_at: :desc) }
end
