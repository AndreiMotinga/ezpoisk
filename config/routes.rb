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

    resources :questions do
      get "autocomplete", on: :collection
    end
    resources :answers, only: %i(index show create edit update destroy)

    resources :listings, only: %i(index show create edit update destroy)
    resources :states, only: :index
    resources :cities, only: :index
    resources :pictures, only: [:create, :destroy]
    resources :users, only: [:show, :update]
    get "users/listings", to: "users#listings"
  end

  root to: "application#index"
  get "/*path", to: "application#index"
end
