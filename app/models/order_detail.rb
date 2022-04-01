class OrderDetail < ApplicationRecord
  belongs_to :order
  belongs_to :food

  validates :count, presence: true

  def self.order_details_create!(user)
    user.cart_details.each do |cart_detail|
      self.create!(
        order_id: user.orders.last.id,
        food_id: cart_detail.food_id,
        count: cart_detail.count,
      )
    end
  end
end
