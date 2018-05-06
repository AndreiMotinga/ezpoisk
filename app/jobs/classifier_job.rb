# frozen_string_literal: true

# assigns kind to a listings
class ClassifierJob
  include Sidekiq::Worker

  def perform(id)
    # return unless Rails.env.production?
    listing = Listing.find_by(id: id)
    return unless listing
    listing.kind = Classifier.classify listing.text
    listing.save
  end
end
