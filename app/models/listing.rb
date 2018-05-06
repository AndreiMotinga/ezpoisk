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

  after_create :classify

  scope :kind, ->(kind) { where(kind: kind) }
  scope :state, ->(state) { where(state: state) }
  scope :city, ->(city) { where(city: city) }
  scope :search, ->(term) { pg_search(term) }
  scope :user_id, ->(id) { where(user_id: id) }
  scope :desc, -> { order(created_at: :desc) }
  scope :active, -> { where.not(text: "").where.not(kind: ["", "spam"]) }
  scope :fresh, -> { where("created_at > ?", "2018-02-18") }

  private

  def classify
    ClassifierJob.perform_async(id)
  end
end
