class Api::CitiesController < ApplicationController
  def index
    cities = params[:all].present? ? all : present
    render json: cities
  end

  private

  def present
    cities = Listing.state(state).pluck(:city).uniq
    cities.map! do |city|
      {
        value: city,
        label: city.split("-").map(&:capitalize).join(" ")
      }
    end
  end

  def all
    state_key = CS.states(:us).select { |_, v| v.parameterize == state }.keys.first
    CS.cities(state_key, :us).map do |v|
      { value: v.parameterize, label: v }
    end
  end

  def state
    params[:state].present? ? params[:state] : "new-york"
  end
end
