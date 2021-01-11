module Api
    module V1
        ### Creates accounts! 
        class RegistrationsController < ApplicationController
            def create
                # Attempts to create 
                user = User.create!(
                    email: params['user']['email'],
                    name: params['user']['name'],
                    password: params['user']['password'],
                    password_confirmation: params['user']['password_confirmation']
                )
            # If passed the validations and created User 
            if user
                session[:user_id] = user.id
                render json: {
                    status: :created,
                    user: user
                }
            # If did not pass User validations ...
            else
                render json: {status: 500}
            end
            end
        end
    end
end

