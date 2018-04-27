require "administrate/base_dashboard"

class PictureDashboard < Administrate::BaseDashboard
  ATTRIBUTE_TYPES = {
    listing: Field::BelongsTo,
    id: Field::Number,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    image_file_name: Field::String,
    image_content_type: Field::String,
    image_file_size: Field::Number,
    image_updated_at: Field::DateTime,
    source: Field::String,
  }.freeze

  COLLECTION_ATTRIBUTES = [
    :listing,
    :id,
    :created_at,
    :updated_at,
  ].freeze

  SHOW_PAGE_ATTRIBUTES = [
    :listing,
    :id,
    :created_at,
    :updated_at,
    :image_file_name,
    :image_content_type,
    :image_file_size,
    :image_updated_at,
    :source,
  ].freeze

  FORM_ATTRIBUTES = [
    :listing,
    :image_file_name,
    :image_content_type,
    :image_file_size,
    :image_updated_at,
    :source,
  ].freeze

  # def display_resource(picture)
  #   "Picture ##{picture.id}"
  # end
end
