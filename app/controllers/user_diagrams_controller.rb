class UserDiagramsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
    
    def create
        user = User.find_by(id: session[:user_id])
        if user
            userDiagram = UserDiagram.create!(user_diagram_params)
            render json: userDiagram, status: :created
        else
            render json: {errors: ["No user logged in"]}, status: 401
        end
    end

    private

    def user_diagram_params
        params.permit(:user_id, :diagram_id)
    end

    def render_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
