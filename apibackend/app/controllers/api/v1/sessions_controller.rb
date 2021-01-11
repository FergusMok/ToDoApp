module Api
  module V1
    ### Allows us to login!
    class SessionsController < ApplicationController
      include CurrentUserConcern
      before_action :set_current_user

        def create
          user = User
                  .find_by(email: params["user"]["email"])
                  # Bcrypt autheticate method, attempts to log in here.
                  .try(:authenticate, params["user"]["password"])
          
          if user
            # Assign to rails session.
            session[:user_id] = user.id
            render json: {status: :created, logged_in: true, user: user}
          else
            # Render status code 401 upon failure 
            render json: {status: 401, message: "Wrong email and/or password!"}
          end
        end

        def logged_in
          # current_user logged in..
          if @current_user
            render json: {logged_in: true, user: @current_user}
          else
            render json: {logged_in: false}
          end
        end
        
        def logout
          reset_session
          render json: {status: 200, logged_out: true}
        end

        def showOnlyUserItems
          p "Current Users"
          p @current_user
          @items = Item.where(user_id: @current_user.id)
          render json: {status: 'Sucessful!', message:"Loaded my to-do item", data: @items}, status: :ok
        end

      end
    end
  end