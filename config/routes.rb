Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth'
      resources :restaurants do
        resources :foods, only: %i[index]
      end
      resources :cart, only: %i[index create]
      put 'cart/replace', to: 'cart#replace'
      resources :orders, only: %i[create]
    end
  end
end
