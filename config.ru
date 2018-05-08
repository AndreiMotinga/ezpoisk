# This file is used by Rack-based servers to start the application.

require_relative 'config/environment'

use Rack::CanonicalHost, ENV["APPLICATION_HOST"] if ENV["APPLICATION_HOST"]
run Rails.application
