Rails.application.routes.draw do
  namespace :admin do
    %i(
      listings
      users
    ).each do |name|
      resources name, only: %i(index show new create edit update destroy)
    end

    root to: "listings#index"
  end

  namespace :api, defaults: { format: :json }  do
    mount_devise_token_auth_for "User", at: "auth"
    resources :listings, only: %i(index show create edit update destroy)
    resources :states, only: :index
    resources :cities, only: :index
  end

  root to: "application#index"
end
