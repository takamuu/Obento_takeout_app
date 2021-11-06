class CartDetail < ApplicationRecord
  belongs_to :food
  belongs_to :cart, optional: true

  validates :count,  presence: true, numericality: { greater_than: 0 }

  # active等削除したので、後で要確認
  # scope :active, -> { where(active: true) }
  # scope :other_restaurant, -> (picked_restaurant_id) { where.not(restaurant_id: picked_restaurant_id) }

  def total_amount
    food.price * count
  end
end
