class Api::V1::CartsController < ApplicationController
  before_action :set_food, only: %i[create]

  def index
    carts = Cart.find_by(user_id:1)
    #  binding.pry
    if carts.present?
      render json: [
        cart_ids: carts.id,
        restaurant: carts.cart_details_foods.first.restaurant,
        foods: carts.cart_details_foods,
        total_price: carts.total_price,
      ], status: :ok
    else
      # binding.pry
      render json: [], status: :no_content
    end
  end

  def create
    all_food_in_cart = User.first.cart.foods
    if @ordered_food.restaurant_id != all_food_in_cart.first
      return render json: {
        existing_restaurant: all_food_in_cart.first.restaurant.name,
        new_restaurant: Food.find(params[:food_id]).restaurant.name,
      }, status: :not_acceptable
    end

    set_cart(@ordered_food)

    if @cart.save
      render json: {
        cart: @cart
      }, status: :created
    else
      render json: {}, status: :internal_server_error
    end
  end

    private

    def set_food
      @ordered_food = Food.find(params[:food_id])
    end

    def set_cart(ordered_food)
      if ordered_food.cart.present?
        @cart = ordered_food.cart
        @cart.attributes = {
          count: ordered_food.cart.count + params[:count],
          active: true
        }
      else
        @cart = ordered_food.build_cart(
          count: params[:count],
          restaurant: ordered_food.restaurant,
          active: true
        )
      end
    end
end
