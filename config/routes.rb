Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      devise_scope :api_v1_user do
        post "auth/guest_sign_in", to: "auth/sessions#guest_sign_in"
      end

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

      resources :orders, only: %i[index create]
    end
  end

  get "*path", to: "application#fallback_index_html", constraints: ->(request) {
    !request.xhr? && request.format.html?
  }
end
