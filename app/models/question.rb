class Question < ApplicationRecord
  extend FriendlyId

  belongs_to :user
  has_many :answers

  friendly_id :title
  scope :user, ->(id) { where(user_id: id) }
  scope :desc, -> { order(created_at: :desc) }
  scope :search, ->(keyword) { where('title ilike ?', "%#{keyword}%") }
end
