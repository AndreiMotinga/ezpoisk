class Api::UsersController < ApplicationController
  before_action :authenticate_api_user!

  def update
    if current_api_user.update(user_params)
      render json: current_api_user
    else
      render json: current_api_user.errors, status: :unprocessable_entity
    end
  end

  def listings
    @listings = current_api_user.listings.desc
                .includes(:pictures)
    serialized = ListingSerializer.new(@listings).serialized_json
    render json: serialized
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
