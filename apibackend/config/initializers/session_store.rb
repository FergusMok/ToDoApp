=begin if Rails.env == "production" # For production
    Rails.application.config.session_store :cookie_store, expire_after: 3.days,
    key: "_authentication_app", 
    domain: "https://fergus-cvwo.netlify.app",
    header: :any,
    secure: true,
    httponly: false,
    same_site: :none

else
    # If in development, don't care about domain.
    Rails.application.config.session_store :cookie_store, expire_after: 3.days,
    key: "_authentication_app"
end 
=end

Rails.application.config.session_store :cookie_store, expire_after: 3.days,
    key: "_authentication_app"
