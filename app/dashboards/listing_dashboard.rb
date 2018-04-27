require "administrate/base_dashboard"

class ListingDashboard < Administrate::BaseDashboard
  ATTRIBUTE_TYPES = {
    id: Field::Number,
    user: Field::BelongsTo,
    pictures: Field::HasMany,
    active: Field::Boolean,
    text: Field::Text,
    state: Field::String,
    city: Field::String,
    kind: Field::String,
    source: Field::String,
    phone: Field::String,
    email: Field::String,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
  }.freeze

  COLLECTION_ATTRIBUTES = [
    :id,
    :text,
    :user,
    :pictures,
    :active,
  ].freeze

  SHOW_PAGE_ATTRIBUTES = [
    :id,
    :user,
    :pictures,
    :active,
    :text,
    :state,
    :city,
    :kind,
    :source,
    :phone,
    :email,
    :created_at,
    :updated_at,
  ].freeze

  FORM_ATTRIBUTES = [
    :user,
    :pictures,
    :active,
    :text,
    :state,
    :city,
    :kind,
    :source,
    :phone,
    :email,
  ].freeze

  # def display_resource(listing)
  #   "Listing ##{listing.id}"
  # end
end
