class Api::AnswersController < ApplicationController
  before_action :set_answer, only: [:update, :destroy]

  # GET /answers
  def index
    @answers = apply_scopes(Answer.includes(:question, :user).desc)
                .page(params[:page]).per(params[:per_page])
    options = { meta: meta }
    serialized = AnswerSerializer.new(@answers, options).serialized_json
    render json: serialized
  end

  # GET /answers/1
  def show
    @answer = Answer.where(question_id: params[:question_id],
                           user_id: params[:user_id]).first_or_create
    render json: AnswerSerializer.new(@answer).serialized_json
  end

  # POST /answers
  def create
    @answer = current_api_user.answers.build(answer_params)

    if @answer.save
      render json: AnswerSerializer.new(@answer).serialized_json
    else
      render json: @answer.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /answers/1
  def update
    if @answer.update(answer_params)
      render json: @answer
    else
      render json: @answer.errors, status: :unprocessable_entity
    end
  end

  # DELETE /answers/1
  def destroy
    @answer.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_answer
      @answer = Answer.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def answer_params
      params.require(:answer).permit(:question_id, :text)
    end

    def meta
      {
        links: {
          self: api_answers_url(page: @answers.current_page),
          prev: api_answers_url(page: @answers.prev_page),
          next: api_answers_url(page: @answers.next_page),
        },
        pagination: {
          current_per_page_count: @answers.current_per_page,
          total_count: @answers.total_count,
          total_pages: @answers.total_pages,
          is_last_page: @answers.last_page?,
        }
      }
    end
end
