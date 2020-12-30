Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      resources :items
      get "/completed" => "items#showCompleted"
      get "/incompleted" => "items#showIncompleted"
    end
  end
end
