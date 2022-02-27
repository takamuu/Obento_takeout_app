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

      # rubocop:disable all
      def create
        # カートが作成されている場合
        if current_api_v1_user.cart.present?
          # 1.追加するフードを含むカート詳細を取得
          cart_details = Cart.acquire_cart_details(current_api_v1_user, @ordered_food)

          # 2.カート詳細があれば更新、なければ作成
          Cart.update_or_create_cart_details(cart_details, current_api_v1_user, cart_details_params)

          # 3.カートの合計金額を更新
          current_api_v1_user.cart.attributes = { total_price: Cart.calc_total_price(current_api_v1_user) }
          if current_api_v1_user.cart.save
            cart_info = current_api_v1_user.cart.user_has_cart_info
            render json: cart_info, status: :ok
          else
            render json: [], status: :internal_server_error
          end

        else
          # カートが作成されていない場合は、カートを作成
          new_cart = Cart.create_cart(current_api_v1_user, @ordered_food, cart_details_params)
          # カート詳細情報を作成
          new_cart_details = new_cart.cart_details.new(cart_details_params)
          if new_cart_details.save
            cart_info = new_cart.user_has_cart_info
            render json: cart_info, status: :ok
          else
            render json: [], status: :internal_server_error
          end
        end
      end
      # rubocop:enable all

      private

        def set_food
          @ordered_food = Food.find(params[:food_id].to_i)
        end

        def set_target_cart_detail
          @target_cart_detail = current_api_v1_user.cart_details.find_by(food_id: delete_params[:id])
        end

        def cart_details_params
          params.permit(:food_id, :count)
        end
    end
  end
end
