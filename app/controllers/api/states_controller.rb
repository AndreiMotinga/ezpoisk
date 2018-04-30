class Api::StatesController < ApplicationController
  def index
    states = CS.states(:us).map { |_, v| { value: v.parameterize, label: v } }
    render json: states
  end
end
