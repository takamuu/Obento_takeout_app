class CartDetail < ApplicationRecord
  belongs_to :food
  belongs_to :cart, optional: true

  validates :count,  presence: true, numericality: { greater_than: 0 }

  def self.new_instance(user, food, food_count)
    new(food_id: food.id, cart_id: user.cart.id, count: food_count)
  end

  def self.update_instance(user, food, food_count)
    cart_detail = user.cart_details.find_by(food_id: food.id)
    cart_detail.attributes = { count: food_count }
    cart_detail
  end

  def self.add_instance(user, food, food_count)
    cart_detail = user.cart_details.find_by(food_id: food.id)
    cart_detail.attributes = { count: cart_detail.count + food_count }
    cart_detail
  end

  def remove?
    ActiveRecord::Base.transaction do
      destroy!
      cart.total_price_update!
    end
  rescue ActiveRecord::RecordInvalid
    false
  end

  def self.remove_and_create?(user, food, food_count)
    ActiveRecord::Base.transaction do
      user.cart.cart_details.clear
      new_instance(user, food, food_count).save!
      Cart.total_price_update!(user)
    end
  rescue ActiveRecord::RecordInvalid
    false
  end
end
