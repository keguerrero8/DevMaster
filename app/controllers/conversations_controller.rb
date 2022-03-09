class ConversationsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid

    def index
        user = User.find_by(id: session[:user_id])
        if user
            render json: user.conversations.uniq
        else
            render json: {errors: ["No user logged in"]}, status: 401
        end
    end

    def show
        user = User.find_by(id: session[:user_id])
        conversation = Conversation.find_by(id: params[:id])
        if user
            render json: conversation.messages
        else
            render json: {errors: ["No user logged in"]}, status: 401
        end
    end

    def create
        user = User.find_by(id: session[:user_id])
        if user
            convo = user.conversations.create!(convo_params)
            render json: convo, status: :created
        else
            render json: {errors: ["No user logged in"]}, status: 401
        end
    end

    def invite
        user = User.find_by(id: params[:user_id])
        if user
            convo = Conversation.find_by(id: params[:conversation_id])
            convo.users << user
            # convo = user.conversations.create!(convo_params)
            render json: convo, status: :created
        else
            render json: {errors: ["No user logged in"]}, status: 401
        end
    end

    private

    def convo_params
        params.permit(:title)
    end

    def render_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
