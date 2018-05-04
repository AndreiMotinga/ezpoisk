class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :listings, dependent: :destroy
  has_many :pictures, through: :listings

  has_attached_file(
    :avatar,
    styles: { thumb: "100x100#" },
    default_url: "https://s3.amazonaws.com/ezpoisk-dev/avatar.png"
  )
  validates_attachment_content_type :avatar, content_type: %r{\Aimage\/.*\Z}
  after_create :save_avatar_from_source

  def avatar_remote_url=(url_value)
    if url_value.present?
      self.avatar = URI.parse(url_value)
      @avatar_remote_url = url_value
    end
  end

  private

  def save_avatar_from_source
    return if avatar_source.blank?
    AvatarDownloaderJob.perform_async(id)
  end
end
