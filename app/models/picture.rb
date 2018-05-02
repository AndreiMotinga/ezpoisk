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

  attr_reader :image_remote_url
  def image_remote_url=(url_value)
    if url_value.present?
      self.image = URI.parse(url_value)
      @image_remote_url = url_value
    end
  end

  def serialized_variants
    result = %I[thumb medium large original].each_with_object({}) do |t, res|
      res[t] = image.url(t)
    end
    result[:source] = source
    result[:main] = source.present? ? source : image.url(:large)
    result
  end
end
