# frozen_string_literal: true

# creates user avatar from avatar_source after automatice user creation, which
# happens after listing import
class AvatarDownloaderJob
  include Sidekiq::Worker

  def perform(id)
    user = User.find_by(id: id)
    return unless user
    user.avatar_remote_url = user.avatar_source
    user.save
  end
end
