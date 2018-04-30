class Api::CitiesController < ApplicationController
  def index
    @state = params[:state].present? ? params[:state] : "new-york"
    @state_key = CS.states(:us).select { |_, v| v.parameterize == @state }.keys.first
    cities = CS.cities(@state_key, :us).map do |v|
      { value: v.parameterize, label: v }
    end
    render json: cities
  end
end
