Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      resources :sessions, only: [:create]
      delete :logout, to: "sessions#logout"
      get :logged_in, to: "sessions#logged_in"
      get "/specialshow" => "sessions#showOnlyUserItems"
      resources :registrations, only: [:create]
      #Took out show for security reasons
      resources :items, only: [:show, :create, :update, :destroy] 
      resources :taggings
      get "/emailUsers" => "items#emailUsers"
      #get "/completed" => "items#showCompletedTags"
      #get "/incomplete" => "items#showIncompletedTags"
    end
  end
end
