class DiagramsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid

    def index
        user = User.find_by(id: session[:user_id])
        if user
            render json: user.diagrams
        else
            render json: {errors: ["No user logged in"]}, status: 401
        end
    end

    def show
        user = User.find_by(id: session[:user_id])
        diagram = Diagram.find_by(id: params[:id])
        if user
            render json: diagram.nodes
        else
            render json: {errors: ["No user logged in"]}, status: 401
        end
    end

    def create
        user = User.find_by(id: session[:user_id])
        if user
            diagram = user.diagrams.create!(diagram_params)
            render json: diagram, status: :created
        else
            render json: {errors: ["No user logged in"]}, status: 401
        end
    end

    def destroy
        diagram = Diagram.find_by(id: params[:id])
        diagram.destroy
        head :no_content
    end

    private

    def diagram_params
        params.permit(:name, :description, :user_id)
    end

    def render_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
