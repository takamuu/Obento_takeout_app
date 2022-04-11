class CartDetail < ApplicationRecord
  belongs_to :food
  belongs_to :cart, optional: true

  validates :count,  presence: true, numericality: { greater_than: 0 }

  def self.cart_details_new_instance(user, food, food_count)
    new(food_id: food.id, cart_id: user.cart.id, count: food_count)
  end

  def self.cart_details_update_instance(user, food, food_count)
    cart_detail = user.cart_details.find_by(food_id: food.id)
    cart_detail.attributes = { count: food_count }
    cart_detail
  end

  def self.cart_details_add_instance(user, food, food_count)
    cart_detail = user.cart_details.find_by(food_id: food.id)
    cart_detail.attributes = { count: cart_detail.count + food_count }
    cart_detail
  end

  # カート詳細の合計金額を計算
  def self.calc_cart_details_total_price(user)
    cart_details = fetch_array_of_cart_details(user)
    cart_details.inject(0) {|result, detail| result + (detail.food.price * detail.count) }
  end

  def self.fetch_array_of_cart_details(user)
    where(cart_id: user.cart.id)
  end
end
