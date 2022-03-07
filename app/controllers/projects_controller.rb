class ProjectsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid

    def index
        user = User.find_by(id: session[:user_id])
        if user
            render json: user.projects
        else
            render json: {errors: ["No user logged in"]}, status: 401
        end
    end

    def show
        user = User.find_by(id: session[:user_id])
        project = Project.find_by(id: params[:id])
        if user
            render json: project.tasks
        else
            render json: {errors: ["No user logged in"]}, status: 401
        end
    end

    def create
        user = User.find_by(id: session[:user_id])
        if user
            project = user.projects.create!(project_params)
            render json: project, status: :created
        else
            render json: {errors: ["No user logged in"]}, status: 401
        end
    end

    def update
        project = Project.find_by(id: params[:id])
        project.update!(project_params)
        render json: project
    end

    def destroy
        project = Project.find_by(id: params[:id])
        project.destroy
        head :no_content
    end

    private

    def project_params
        params.permit(:title, :github_link)
    end

    def render_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
