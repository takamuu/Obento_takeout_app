module Api
  module V1
    class CartDetailsController < ApplicationController
      before_action :authenticate_api_v1_user!

      def destroy
        @cart_detail = current_api_v1_user.cart_details.find_by(food_id: delete_params[:id].to_i)
        if @cart_detail
          @cart_detail.destroy!
          # カートの合計金額を更新
          Cart.total_price_update(current_api_v1_user)
          @cart_details = current_api_v1_user.cart_details
          render json: @cart_details, status: :ok
        else
          render json: [], status: :no_content
        end
      end

      def replace
        @cart_detail = current_api_v1_user.cart_details.find_by(food_id: replace_params[:food_id].to_i)
        if @cart_detail
          @cart_detail.update!(count: replace_params[:count].to_i)
          Cart.total_price_update(current_api_v1_user)
          @cart_details = current_api_v1_user.cart_details
          render json: @cart_details, status: :ok
        else
          render json: [], status: :no_content
        end
      end

      private

        def delete_params
          params.permit(:id)
        end

        def replace_params
          params.require(:cart_detail).permit(:food_id, :count)
        end
    end
  end
end
