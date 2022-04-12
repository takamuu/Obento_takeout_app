module Api
  module V1
    class CartDetailsController < ApplicationController
      before_action :authenticate_api_v1_user!
      before_action :set_food, only: %i[update replace]

      def update
        @cart_detail = CartDetail.update_instance(current_api_v1_user, @ordered_food, @food_count)
        if @cart_detail.save! && Cart.total_price_update!(current_api_v1_user)
          render json: @cart_detail, status: :ok
        else
          render json: [], status: :no_content
        end
      end

      def destroy
        @cart_detail = current_api_v1_user.cart_details.find_by(food_id: delete_params[:id].to_i)
        if CartDetail.remove?(@cart_detail)
          render json: current_api_v1_user.cart_details, status: :ok
        else
          render json: [], status: :no_content
        end
      end

      def replace
        if CartDetail.remove_and_create?(current_api_v1_user, @ordered_food, @food_count)
          render json: current_api_v1_user.cart_details, status: :ok
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
