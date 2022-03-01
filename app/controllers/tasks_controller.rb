class TasksController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid

    def create
        project = Project.find(params[:project_id])
        task = project.tasks.create!(task_params)
        render json: task
    end

    def update
        task = Task.find_by(id: params[:id])
        task.update!(task_params)
        render json: task
    end

    def destroy
        task = Task.find_by(id: params[:id])
        task.destroy 
        head :no_content
    end

    private

    def task_params
        params.permit(:content, :status, :order, :project_id)
    end

    def render_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
