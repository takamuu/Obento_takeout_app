class CartDetail < ApplicationRecord
  belongs_to :food
  belongs_to :cart, optional: true

  validates :count,  presence: true, numericality: { greater_than: 0 }
end
