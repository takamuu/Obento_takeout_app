module Api
  module V1
    class OrdersController < ApplicationController
      before_action :authenticate_api_v1_user!

      def index
        if current_api_v1_user.orders.present? && current_api_v1_user.order_details.present?
          render json: current_api_v1_user.orders, status: :ok
        else
          render json: [], status: :no_content
        end
      end

      def create
        if Cart.find_by(user_id: order_params[:user_id].to_i).present? && Order.create_order_history(current_api_v1_user).present?
          render status: :ok
        else
          render status: :no_content
        end
      end

      private

        def order_params
          params.permit(:user_id)
        end
    end
  end
end
