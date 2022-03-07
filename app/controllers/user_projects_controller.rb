class UserProjectsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
    
    def create
        user = User.find_by(id: session[:user_id])
        if user
            userProject = UserProject.create!(user_project_params)
            render json: userProject, status: :created
        else
            render json: {errors: ["No user logged in"]}, status: 401
        end
    end

    private

    def user_project_params
        params.permit(:user_id, :project_id)
    end

    def render_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
