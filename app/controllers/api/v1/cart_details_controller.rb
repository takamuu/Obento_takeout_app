module Api
  module V1
    class CartDetailsController < ApplicationController
      before_action :authenticate_api_v1_user!
      before_action :set_food, only: %i[update replace]

      def update
        @cart_detail = CartDetail.cart_details_update_instance(current_api_v1_user, @ordered_food, @food_count)
        if @cart_detail.save! && Cart.total_price_update(current_api_v1_user)
          render json: @cart_detail, status: :ok
        else
          render json: [], status: :no_content
        end
      end

      def destroy
        @cart_detail = current_api_v1_user.cart_details.find_by(food_id: delete_params[:id].to_i)
        if @cart_detail.destroy && Cart.total_price_update(current_api_v1_user)
          @cart_details = current_api_v1_user.cart_details
          render json: @cart_details, status: :ok
        else
          render json: [], status: :no_content
        end
      end

      def replace
        current_api_v1_user.cart.cart_details.clear
        @new_cart_details = CartDetail.cart_details_new_instance(current_api_v1_user, @ordered_food, @food_count)
        if @new_cart_details.save! && Cart.total_price_update(current_api_v1_user)
          render json: @new_cart_details, status: :ok
        else
          render json: [], status: :no_content
        end
      end

      private

        def set_food
          @ordered_food = Food.find(update_params[:food_id].to_i)
          @food_count = update_params[:count].to_i
        end

        def delete_params
          params.permit(:id)
        end

        def update_params
          params.require(:cart_detail).permit(:food_id, :count)
        end
    end
  end
end
