module Api
  module V1
    class CartsController < ApplicationController
      before_action :authenticate_api_v1_user!
      before_action :set_food, only: %i[create]

      def index
        if current_api_v1_user.cart.present? && current_api_v1_user.cart_details.present?
          cart_info = current_api_v1_user.cart.user_has_cart_info
          render json: cart_info, status: :ok
        else
          render json: [], status: :no_content
        end
      end

      def create
        if Cart.check_other_restaurant?(current_api_v1_user, @ordered_food)
          return render json: cart_details_params, status: :not_acceptable
        end

        if Cart.check_users_cart?(current_api_v1_user, @ordered_food, @food_count)
          cart_info = Cart.find_by(user_id: current_api_v1_user.id).user_has_cart_info
          render json: cart_info, status: :ok
        else
          render json: [], status: :internal_server_error
        end
      end

      private

        def set_food
          @ordered_food = Food.find(params[:food_id].to_i)
          @food_count = cart_details_params[:count].to_i
        end

        def cart_details_params
          params.permit(:food_id, :count)
        end
    end
  end
end
