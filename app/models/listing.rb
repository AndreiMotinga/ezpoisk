class Listing < ApplicationRecord
  belongs_to :user
  has_many :pictures, dependent: :destroy

  scope :kind, -> (kind) { where(kind: kind) }
  scope :state, -> (state) { where(state: state) }
  scope :city, -> (city) { where(city: city) }
  scope :desc, -> { order(created_at: :desc) }
end
