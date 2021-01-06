if Rails.env == "production"
    Rails.application.config.session_store :cookie_store, 
    key: "_authentication_app", 
    domain: "https://fergus-cvwo.netlify.app/"
else
    # If in development, don't care about domain.
    Rails.application.config.session_store :cookie_store, 
    key: "_authentication_app"
end