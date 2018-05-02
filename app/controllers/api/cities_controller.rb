class Api::CitiesController < ApplicationController
  def index
    state = params[:state].present? ? params[:state] : "new-york"
    cities = Listing.state(state).pluck(:city).uniq

    cities.map! do |city|
      {
        value: city,
        label: city.split("-").map(&:capitalize).join(" ")
      }
    end

    render json: cities
  end
end
