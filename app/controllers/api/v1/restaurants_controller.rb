module Api
  module V1
    class RestaurantsController < ApplicationController
      def index
        restaurants = Restaurant.all.order(id: "ASC")

        render json: restaurants, status: :ok
      end
    end
  end
end
