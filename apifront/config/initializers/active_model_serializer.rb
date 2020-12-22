api_mime_type = %W(
    application/vnd.api+json
    text/x-json
    application/json
  )
  
Mime::Type.register 'application/vnd.api+json', :json, api_mime_type