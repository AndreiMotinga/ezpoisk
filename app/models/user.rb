class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :listings, dependent: :destroy

  has_attached_file(:avatar,
                    styles: { thumb: "100x100#", medium: "200x200#" },
                    default_url: "default-avatar.png")
  validates_attachment_content_type :avatar, content_type: %r{\Aimage\/.*\Z}

  # for omnouth login
  def avatar_remote_url=(url_value)
    if url_value.present?
      self.avatar = URI.parse(url_value)
      @avatar_remote_url = url_value
    end
  end
end
