class Picture < ActiveRecord::Base
  belongs_to :listing

  has_attached_file :image, styles: { thumb: "100x100#",
                                      medium: "x180",
                                      large: "x450" }
  validates_attachment_content_type :image, content_type: %r{\Aimage\/.*\Z}
  validates_attachment_file_name :image, matches: [/png\Z/i, /jpe?g\Z/i]
  validates_with AttachmentSizeValidator,
                 attributes: :image,
                 less_than: 5.megabytes

  after_create :save_image_from_source

  attr_reader :image_remote_url
  def image_remote_url=(url_value)
    if url_value.present?
      self.image = URI.parse(url_value)
      @image_remote_url = url_value
    end
  end

  def serialized_variants
    %I[thumb medium large original].each_with_object({}) do |type, obj|
      obj[type] = image.url(type)
    end
  end

  def main_image_url
    source.present? ? source : image.url(:large)
  end

  private

  def save_image_from_source
    return if source.blank?
    ImageDownloaderJob.perform_async(id)
  end
end
