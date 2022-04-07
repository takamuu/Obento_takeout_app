class CartDetail < ApplicationRecord
  belongs_to :food
  belongs_to :cart, optional: true

  validates :count,  presence: true, numericality: { greater_than: 0 }

  def self.update_cart_details(user, food, food_count)
    cart_detail = user.cart_details.find_by(food_id: food.id)
    cart_detail.update!(food_id: food.id, count: cart_detail.count + food_count)
  end

  def self.create_cart_details(user, food, food_count)
    create!(food_id: food.id, cart_id: user.cart.id, count: food_count)
  end
end
