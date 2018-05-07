source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "2.4.1"

gem "bootsnap", ">= 1.1.0", require: false
gem "city-state"
gem "devise_token_auth"
gem "fast_jsonapi"
gem "has_scope"
gem "kaminari"
gem "pg"
gem "pg_search"
gem "puma", "~> 3.11"
gem "rack-cors"
gem "rails", "~> 5.2.0"
gem "rack-canonical-host"

gem "classifier-reborn"
gem "koala", "~> 2.2"
gem "slack-notifier"
gem "vkontakte_api", "~> 1.4"

gem "aws-sdk", "< 3.0"
gem "paperclip"

gem "administrate"

gem "sidekiq"
gem "sidekiq-cron"
gem "sinatra", require: nil, github: "sinatra/sinatra"

group :development, :test do
  gem "awesome_print"
  gem "dotenv-rails"
  gem "pry-byebug"
end

group :development do
  gem "listen", ">= 3.0.5", "< 3.2"
  gem "spring"
  gem "spring-watcher-listen", "~> 2.0.0"
end
