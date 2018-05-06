class Listing < ApplicationRecord
  belongs_to :user
  has_many :pictures, dependent: :destroy

  include PgSearch
  pg_search_scope :pg_search,
                  against: [:text],
                  using: {
                    tsearch: {
                      dictionary: "russian"
                    }
                  }

  scope :kind, ->(kind) { where(kind: kind) }
  scope :state, ->(state) { where(state: state) }
  scope :city, ->(city) { where(city: city) }
  scope :search, ->(term) { pg_search(term) }
  scope :user_id, ->(id) { where(user_id: id) }
  scope :desc, -> { order(created_at: :desc) }
  scope :active, -> { where.not(text: "") }
end
