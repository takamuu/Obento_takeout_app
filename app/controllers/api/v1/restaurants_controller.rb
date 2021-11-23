class Api::V1::RestaurantsController < ApplicationController
  def index
    restaurants = Restaurant.all.order(id: "ASC")

    render json: restaurants, status: :ok
  end
end
