class Food < ApplicationRecord
  belongs_to :restaurant
  has_many :order_details, dependent: :destroy

  validates :name,             presence: true, uniqueness: true
  validates :food_description, presence: true
  validates :price,            presence: true
  validates :sales_status,     presence: true
  validates :image,            presence: true

  enum sales_status: { 
    on_sales: 1,
    sold_out: 2, 
  }

end