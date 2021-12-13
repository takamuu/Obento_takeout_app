class Api::V1::CartsController < ApplicationController
  before_action :set_food, only: %i[create]

  def index
    carts = Cart.find_by(user_id:1)
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
    # 暫定的にuserをid:1に限定（ログイン機能実装時に、User判定ロジックを追加）
    # all_food_in_cart = User.find_by(id:1).cart.foods
    # if @ordered_food.restaurant_id != all_food_in_cart.first.restaurant_id
    #   return render json: {
    #     existing_restaurant: all_food_in_cart.first.restaurant.name,
    #     new_restaurant: Food.find(params[:food_id]).restaurant.name,
    #   }, status: :not_acceptable
    # end

    # パラムスから取得してきたFoodを取得する
    set_cart(@ordered_food)

    # todo: カートindexを実装時に必要であればrenderを実装する
    #   if @cart_details.save
    #     render json: {
    #       cart: @cart_details
    #     }, status: :created
    #   else
    #     render json: {}, status: :internal_server_error
    #   end
  end

    private

    def set_food
      @ordered_food = Food.find(params[:food_id])
    end

    def set_cart(ordered_food)
      # 暫定ログインユーザー
      test_user = User.first
      if test_user.cart.blank?
        # カートを作成
        Cart.create(user_id:test_user.id, total_price: @ordered_food.price * params[:count])
      end
      # カート詳細情報を作成
      test_user.cart.cart_details.create(
        food_id: params[:food_id],
        count: params[:count]
      )
    end

    # todo: 更新メソッド時に以下を使用
    #   ordered_food.cart_details.first
    #   @cart_details.attributes = {
    #     count: ordered_food.cart_details.first.count + params[:count]
    #   }
    # else
    #  ordered_food.new(
    #   count: params[:count],
    #   restaurant: ordered_food.restaurant,
    # )
    # end
end
