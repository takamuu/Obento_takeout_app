class Api::V1::CartsController < ApplicationController
  def create
    posted_temporary_orders = TemporaryOrder.where(id: params[:temporary_order_ids])
    cart = Cart.new(
      total_price: total_price(posted_temporary_orders),
    )
    if cart.save_with_update_temporary_orders!(posted_temporary_orders)
      render json: {}, status: :no_content
    else
      render json: {}, status: :internal_server_error
    end
  end

  private

    def total_price(posted_temporary_orders)
      posted_temporary_orders.sum { |temporary_order| temporary_order.total_amount } + posted_temporary_orders.first.restaurant.fee
    end
end
