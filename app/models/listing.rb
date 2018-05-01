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
  scope :desc, -> { order(created_at: :desc) }

  def serialized_images
    pictures.map(&:serialized_images)
  end
end
