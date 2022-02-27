module Api
  module V1
    class CartDetailsController < ApplicationController
      before_action :authenticate_api_v1_user!
      before_action :set_target_cart_detail, only: %i[destroy]

      def destroy
        if @target_cart_detail
          @target_cart_detail.destroy!
          cart_info = current_api_v1_user.cart.user_has_cart_info
          render json: cart_info, status: :ok
        else
          render json: [], status: :no_content
        end
      end

      private

        def set_target_cart_detail
          @target_cart_detail = current_api_v1_user.cart_details.find_by(food_id: cart_details_params[:id])
        end

        def cart_details_params
          params.permit(:id, :food_id, :count)
        end
    end
  end
end
