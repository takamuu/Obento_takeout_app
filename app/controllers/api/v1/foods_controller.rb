class Api::V1::FoodsController < ApplicationController
  def index
    restaurant = Restaurant.find(params[:restaurant_id])
    foods = restaurant.foods.order(id: "ASC")

    render json: foods, status: :ok
  end
end
