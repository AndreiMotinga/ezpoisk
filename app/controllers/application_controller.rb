class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  # enabling admin panel requires rails view middlware
  # which leads devise_token_auth to throw cookie::overflow error
  # skip setting cookies for api controllers
  # more https://github.com/lynndylanhurley/devise_token_auth/issues/718
  before_action :skip_cookies

  def index
    render json: { name: "ez apps server" }, status: 200
  end

  protected

  def skip_cookies
    request.session_options[:skip] = true
  end
end
