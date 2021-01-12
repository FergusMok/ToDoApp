module Api
    module V1
        class ApplicationController < ActionController::API
            # Skip the CRSF token verifying, because Rails is an API here. 
            include ActionController::Cookies
        end
    end
end