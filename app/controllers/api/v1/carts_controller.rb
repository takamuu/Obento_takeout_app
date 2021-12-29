module Api
  module V1
    class CartsController < ApplicationController
      before_action :set_food, only: %i[create]
      before_action :test_user

      def index
        cart = @test_user.cart
        if cart.present?
          cart_info = cart.get_cart_info
          render json: cart_info, status: :ok
        else
          render json: [], status: :no_content
        end
      end

      def create
        set_cart(@ordered_food)
      end

      private

        def set_food
          @ordered_food = Food.find(params[:food_id])
        end

        # 暫定ログインユーザー
        def test_user
          @test_user = User.first
        end

        def set_cart(ordered_food)
          # ユーザーのカートがない場合
          if @test_user.cart.blank?
            # カートを作成
            Cart.create_cart(@test_user, ordered_food, params[:count])
            # カート詳細情報を作成
            @test_user.cart.cart_details.create(
              food_id: params[:food_id],
              count: params[:count],
            )
          else
            # ユーザーのカートがある場合
            # カート詳細のフード注文個数を更新
            users_cart = @test_user.cart
            cart_details = CartDetail.find_by(food_id: ordered_food.id, cart_id: users_cart.id)
            # カート詳細のフード有無を判定
            if cart_details.blank?
              cart_details = CartDetail.new(
                food_id: ordered_food.id,
                cart_id: users_cart.id,
                count: params[:count],
              )
            else
              cart_details.attributes = {
                count: cart_details.count + params[:count],
              }
            end
            # カートの注文合計金額を更新
            all_details_of_cart = CartDetail.where(cart_id: users_cart.id)
            total_price = 0
            all_details_of_cart.each do |detail|
              total_price += detail.food.price * detail.count
            end
            users_cart.attributes = {
              total_price: total_price,
            }
            if cart_details.save && users_cart.save
              render json: cart_details, status: :created
            else
              render json: {}, status: :internal_server_error
            end
          end
        end
    end
  end
end
