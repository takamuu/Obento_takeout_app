module Api
  module V1
    class CartDetailsController < ApplicationController
      before_action :authenticate_api_v1_user!

      def update
        @cart_detail = current_api_v1_user.cart_details.find_by(food_id: update_params[:food_id].to_i)
        if @cart_detail
          @cart_detail.update!(count: update_params[:count].to_i)
          Cart.total_price_update(current_api_v1_user)
          @cart_details = current_api_v1_user.cart_details
          render json: @cart_details, status: :ok
        else
          render json: [], status: :no_content
        end
      end

      def destroy
        @cart_detail = current_api_v1_user.cart_details.find_by(food_id: delete_params[:id].to_i)
        if @cart_detail
          @cart_detail.destroy!
          Cart.total_price_update(current_api_v1_user)
          @cart_details = current_api_v1_user.cart_details
          render json: @cart_details, status: :ok
        else
          render json: [], status: :no_content
        end
      end

      def replace
      end

      private

        def delete_params
          params.permit(:id)
        end

        def update_params
          params.require(:cart_detail).permit(:food_id, :count)
        end
    end
  end
end
