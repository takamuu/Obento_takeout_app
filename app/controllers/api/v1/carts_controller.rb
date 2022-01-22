module Api
  module V1
    class CartsController < ApplicationController
      before_action :authenticate_api_v1_user!
      before_action :set_food, only: %i[create]

      def index
        if current_api_v1_user.cart.present? && current_api_v1_user.cart.cart_details.present?
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
          cart_details = acquire_cart_details(@ordered_food)

          # 2.カート詳細があれば更新、なければ作成
          update_or_create_cart_details(cart_details)

          # 3.カートの合計金額を更新
          current_api_v1_user.cart.attributes = { total_price: calc_total_price }
          if current_api_v1_user.cart.save
            cart_info = current_api_v1_user.cart.user_has_cart_info
            render json: cart_info, status: :ok
          else
            render json: [], status: :internal_server_error
          end

        else
          # カートが作成されていない場合は、カートを作成
          new_cart = Cart.create!(user_id: current_api_v1_user.id, total_price: @ordered_food.price * params[:count].to_i)
          # カート詳細情報を作成
          new_cart_details = new_cart.cart_details.new(food_id: params[:food_id].to_i, count: params[:count].to_i)
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

        # 追加するフードを含むカート詳細を取得
        def acquire_cart_details(ordered_food)
          current_api_v1_user.cart.cart_details.find_by(food_id: ordered_food.id)
        end

        # カート詳細があれば更新、なければ作成
        def update_or_create_cart_details(cart_details)
          if cart_details.present?
            cart_details.update!(count: cart_details.count + params[:count].to_i)
          else
            current_api_v1_user.cart.cart_details.create!(food_id: params[:food_id].to_i, count: params[:count].to_i)
          end
        end

        # カートの合計金額を更新
        def calc_total_price
          @total_price = 0
          current_api_v1_user.cart.cart_details.each do |detail|
            @total_price += detail.food.price * detail.count
          end
          @total_price
        end
    end
  end
end
