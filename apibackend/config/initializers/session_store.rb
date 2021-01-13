if Rails.env == "production" # For production
    Rails.application.config.session_store(:cookie_store, same_site: :none): 3.days,
    key: "_authentication_app",
    header: :any,
    secure: true,
    httponly: false,
    same_site: :none
else
    # If in development, don't care about domain.
    Rails.application.config.session_store(:cookie_store, same_site: :none): 3.days,
    key: "_authentication_app",
    secure: true
end