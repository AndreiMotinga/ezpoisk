Rails.application.routes.draw do
  namespace :api, defaults: { format: :json }  do
    mount_devise_token_auth_for 'User', at: 'auth'
  end

  root to: "application#index"
end
