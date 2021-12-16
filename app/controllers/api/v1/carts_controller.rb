class Api::V1::CartsController < ApplicationController
  before_action :set_food, only: %i[create]
  before_action :test_user

  def index
    binding.pry
    carts = Cart.find_by(user_id: @test_user.id)
    if carts.present?
      render json: [
        cart_ids: carts.id,
        restaurant: carts.cart_details_foods.first.restaurant,
        foods: carts.cart_details_foods,
        total_price: carts.total_price,
      ], status: :ok
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
        @test_user.cart.create(total_price: @ordered_food.price * params[:count])
        # カート詳細情報を作成
        @test_user.cart.cart_details.create(
        food_id: params[:food_id],
        count: params[:count]
      )
      else
      # ユーザーのカートがある場合
        # カート詳細のフード注文個数を更新
        users_cart = @test_user.cart
        cart_details = CartDetail.find_by(food_id: ordered_food.id, cart_id: users_cart.id)
        cart_details.attributes = {
          count: ordered_food.cart_details.first.count + params[:count]
        }
        # カートの注文合計金額を更新
        all_details_of_cart = CartDetail.where(cart_id: users_cart.id)
        total_price = 0
        all_details_of_cart.each do |detail| 
          total_price += detail.food.price * detail.count 
        end
        users_cart.attributes = {
          total_price: total_price 
        }
      end
     
    end


    # else
    #  ordered_food.new(
    #   count: params[:count],
    #   restaurant: ordered_food.restaurant,
    # )
    # end
end
