# frozen_string_literal: true

# creates images for posts, imported from vk and fb
class ImageDownloaderJob
  include Sidekiq::Worker

  def perform(id)
    picture = Picture.find_by(id: id)
    return unless picture
    picture.image_remote_url = picture.source
    picture.save
  end
end
