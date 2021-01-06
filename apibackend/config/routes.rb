Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      resources :sessions, only: [:create]
      delete :logout, to: "sessions#logout"
      get :logged_in, to: "sesions#logged_in"
      resources :registrations, only: [:create]
      resources :items
      resources :taggings
      get "/completed" => "items#showCompletedTags"
      get "/incomplete" => "items#showIncompletedTags"
    end
  end
end
