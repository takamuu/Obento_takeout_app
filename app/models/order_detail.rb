class OrderDetail < ApplicationRecord
  belongs_to :order
  belongs_to :food

  validates :count, presence: true

end