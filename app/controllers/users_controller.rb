class UsersController < ApplicationController
    def index
        user = User.find_by(id: session[:user_id])
        if user
            render json: User.all
        else
            render json: {errors: ["No user logged in"]}, status: 401
        end
    end

    def create 
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    rescue ActiveRecord::RecordInvalid => invalid
        render json: {error: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def update
        user = User.find_by(id: session[:user_id])
        user.update!(user_params)
        render json: user
    end

    def show 
        user = User.find_by(id: session[:user_id])
        if user
            render json: user
        else
            render json: {error: ["Not authorized"]}, status: :unauthorized
        end
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :avatar, :github_username)
    end
end
