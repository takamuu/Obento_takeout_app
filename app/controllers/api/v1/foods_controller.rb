module Api
  module V1
    class FoodsController < ApplicationController
      def index
        restaurant = Restaurant.find(params[:restaurant_id])
        foods = restaurant.foods.order(id: "ASC")

        render json: foods, status: :ok
      end
    end
  end
end
