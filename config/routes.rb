Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      # resources :test, only: %i[index]

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      namespace :auth do
        resources :sessions, only: %i[index]
      end

      resources :restaurants do
        resources :foods, only: %i[index]
      end

      resources :carts, only: %i[index create]

      put 'carts/replace', to: 'carts#replace'
      
      resources :orders, only: %i[create]
      
    end
  end

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
