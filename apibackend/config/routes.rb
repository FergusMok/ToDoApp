Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      resources :items
      resources :taggings
      get "/completed" => "items#showCompletedTags"
      get "/incomplete" => "items#showIncompletedTags"
    end
  end
end
