class Api::ListingsController < ApplicationController
  before_action :authenticate_api_user!, only: [:edit, :update, :destroy]
  before_action :set_listing, only: [:update, :destroy]

  has_scope :kind
  has_scope :state
  has_scope :city
  has_scope :search
  has_scope :user_id

  # GET /listings
  def index
    @listings = apply_scopes(Listing.active.desc)
                .includes(:pictures, :user)
                .page(params[:page]).per(params[:per_page])
    options = { meta: meta }
    serialized = ListingSerializer.new(@listings, options).serialized_json
    render json: serialized
  end

  # GET /listings/1
  def show
    @listing = Listing.find(params[:id])
    render json: ListingSerializer.new(@listing).serialized_json
  end

  def edit
    if params[:id] != "new"
      set_listing
    else
      @listing = current_api_user.listings.new(
        email: current_api_user.email
      )
      @listing.save(validate: false)
    end
    render json: ListingSerializer.new(@listing).serialized_json
  end

  # POST /listings
  def create
    @listing = Listing.new(listing_params)

    if @listing.save
      render json: @listing, status: :created, location: @listing
    else
      render json: @listing.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /listings/1
  def update
    if @listing.update(listing_params)
      render json: @listing
    else
      render json: @listing.errors, status: :unprocessable_entity
    end
  end

  # DELETE /listings/1
  def destroy
    @listing.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_listing
      if current_api_user.admin?
        @listing = Listing.find(params[:id])
      else
        @listing = current_api_user.listings.find(params[:id])
      end
    end

    # Only allow a trusted parameter "white list" through.
    def listing_params
      params.require(:listing).permit(:user_id, :active, :text, :state, :city, :kind, :source, :phone, :email)
    end

    def meta
      {
        links: {
          self: api_listings_url(page: @listings.current_page),
          prev: api_listings_url(page: @listings.prev_page),
          next: api_listings_url(page: @listings.next_page),
        },
        meta: {
          current_per_page_count: @listings.current_per_page,
          total_count: @listings.total_count,
          total_pages: @listings.total_pages,
          is_last_page: @listings.last_page?,
        }
      }
    end
end
