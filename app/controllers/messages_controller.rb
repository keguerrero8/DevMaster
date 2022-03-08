class MessagesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
    
    def create
        user = User.find_by(id: session[:user_id])
        if user
            message = Message.create!(message_params)
            render json: message, status: :created
        else
            render json: {errors: ["No user logged in"]}, status: 401
        end
    end

    private

    def message_params
        params.permit(:user_id, :conversation_id, :content)
    end

    def render_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
