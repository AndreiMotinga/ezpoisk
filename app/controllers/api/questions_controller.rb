class Api::QuestionsController < ApplicationController
  before_action :set_question, only: [:show, :update, :destroy]
  has_scope :user

  # GET /questions
  def index
    @questions = apply_scopes(Question.desc)
                  .page(params[:page]).per(params[:per_page])
    options = { meta: meta }
    serialized = QuestionSerializer.new(@questions, options).serialized_json
    render json: serialized
  end

  # GET /questions/1
  def show
    render json: QuestionSerializer.new(@question).serialized_json
  end

  # POST /questions
  def create
    @question = Question.new(question_params)

    if @question.save
      render json: @question, status: :created, location: @question
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /questions/1
  def update
    if @question.update(question_params)
      render json: @question
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  # DELETE /questions/1
  def destroy
    @question.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_question
      @question = Question.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def question_params
      params.require(:question).permit(:title, :slug, :text, :user_id)
    end

    def meta
      {
        links: {
          self: api_questions_url(page: @questions.current_page),
          prev: api_questions_url(page: @questions.prev_page),
          next: api_questions_url(page: @questions.next_page),
        },
        pagination: {
          current_per_page_count: @questions.current_per_page,
          total_count: @questions.total_count,
          total_pages: @questions.total_pages,
          is_last_page: @questions.last_page?,
        }
      }
    end
end
