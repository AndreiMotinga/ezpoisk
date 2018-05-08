require "sidekiq/web"
require "sidekiq/cron/web"

Rails.application.routes.draw do
  mount Sidekiq::Web => "/sidekiq"

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
    resources :listings, only: %i(index show create edit update destroy) do
      put :mark_as_spam, on: :member
    end
    resources :states, only: :index
    resources :cities, only: :index
    resources :pictures, only: [:create, :destroy]
    resources :users, only: [:update]
    get "users/listings", to: "users#listings"
  end

  root to: "application#index"
end
