Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth'
      resources :restaurants do
        resources :foods, only: %i[index]
      end
      resources :temporary_orders, only: %i[index create]
      put 'temporary_orders/replace', to: 'temporary_orders#replace'
      resources :carts, only: %i[create]
    end
  end
end
