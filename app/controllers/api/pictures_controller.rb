class Api::PicturesController < ApplicationController
  before_action :authenticate_api_user!

  def create
    @picture = Picture.new(picture_params)
    if @picture.save
      render json: PictureSerializer.new(@picture).serialized_json
    else
      render json: { error: @picture.errors.full_messages.join(",") }
    end
  end

  def destroy
    set_picture
    @id = @picture.id
    @picture.destroy
    render json: { id: @id }, status: 200
  end

  private

  def picture_params
    params.require(:picture).permit(:image, :listing_id)
  end

  def set_picture
    if current_api_user.admin?
      @picture = Picture.find(params[:id])
    else
      @picture = current_api_user.pictures.find(params[:id])
    end
  end
end

