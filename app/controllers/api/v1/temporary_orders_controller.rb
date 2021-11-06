class Api::V1::TemporaryOrdersController < ApplicationController
  before_action :set_food, only: %i[create, replace]

  def index
    temporary_orders = TemporaryOrder.active
    if temporary_orders.exists?
      render json: {
        temporary_order_ids: temporary_orders.map { |temporary_order| temporary_order.id },
        restaurant: temporary_orders[0].restaurant,
        count: temporary_orders.sum { |temporary_order| temporary_order[:count] },
        amount: temporary_orders.sum { |temporary_order| temporary_order.total_amount },
      }. status: :ok
    else
      render json: {}, status: :no_content
    end
  end

  def create
    if TemporaryOrder.active.other_restaurant(@ordered_food.restaurant.id).exists?
      return render json: {
        existing_restaurant: TemporaryOrder.other_restaurant(@ordered_food.restaurant.id).first.restaurant.name,
        new_restaurant: Food.find(params[:food_id]).restaurant.name,
      }, status: :not_acceptable
    end

    set_temporary_order(@ordered_food)

    if @temporary_order.save
      render json: {
        temporary_order: @temporary_order
      }, status: :created
    else
      render json: {}, status: :internal_server_error
    end
  end

  def replace
    TemporaryOrder.active.other_restaurant(@ordered_food.restaurant.id).each do |temporary_order|
      temporary_order.update_attribute(:active, false)
    end
    
    set_temporary_order(@ordered_food)

    if @temporary_order.save
      render json: {
        temporary_order: @temporary_order
      }, status: :created
    else
      render json: {}, status: :internal_server_error
    end
  end

  private

    def set_food
      @ordered_food = Food.find(params[:food_id])
    end

    def set_temporary_order(ordered_food)
      if ordered_food.temporary_order.present?
        @temporary_order = ordered_food.temporary_order
        @temporary_order.attributes = {
          count: ordered_food.temporary_order.count + params[:count],
          active: true
        }
      else
        @temporary_order = ordered_food.build_temporary_order(
          count: params[:count],
          restaurant: ordered_food.restaurant,
          active: true
        )
      end
    end
end
