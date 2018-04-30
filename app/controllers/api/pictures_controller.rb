class Api::PicturesController < ApplicationController
  before_action :authenticate_api_user!

  def create
    @picture = Picture.new(picture_params)
    if @picture.save
      render json: @picture
    else
      render json: { error: @picture.errors.full_messages.join(",") }
    end
  end

  def destroy
  end

  private

  def picture_params
    params.require(:picture).permit(:image, :listing_id)
  end
end

