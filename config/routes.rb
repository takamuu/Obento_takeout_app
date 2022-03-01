Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for "User", at: "auth", controllers: {
        registrations: "api/v1/auth/registrations",
      }

      namespace :auth do
        resources :sessions, only: %i[index]
      end

      resources :restaurants do
        resources :foods, only: %i[index]
      end

      resources :carts, only: %i[index create]

      resources :cart_details, only: %i[destroy]

      put "cart_details/replace", to: "cart_details#replace"

      resources :orders, only: %i[create]
    end
  end

  get "*path", to: "application#fallback_index_html", constraints: ->(request) {
    !request.xhr? && request.format.html?
  }
end
