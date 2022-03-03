class CartDetail < ApplicationRecord
  belongs_to :food
  belongs_to :cart, optional: true

  validates :count,  presence: true, numericality: { greater_than: 0 }

  def self.total_price_update(user)
    user.cart.update!(total_price: Cart.calc_total_price(user))
  end
end
