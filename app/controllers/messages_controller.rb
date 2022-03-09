class MessagesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
    
    def create
        # user = User.find_by(id: session[:user_id])
        # if user
        #     message = Message.create!(message_params)
        #     convo = Conversation.find_by(id: params[:conversation_id])
        #     convo.messages << message
        #     render json: message, status: :created
        # else
        #     render json: {errors: ["No user logged in"]}, status: 401
        # end

        user = User.find_by(id: session[:user_id])
        if user
            message = user.messages.create!(message_params)
            render json: message, status: :created
        else
            render json: {errors: ["No user logged in"]}, status: 401
        end
    end

    private

    def message_params
        params.permit(:conversation_id, :content, :user_id)
    end

    def render_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
