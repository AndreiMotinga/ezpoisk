class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  def index
    render file: "public/index.html"
  end
end
