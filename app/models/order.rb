class Order < ApplicationRecord
  belongs_to :user
  has_many :order_details, dependent: :destroy
  has_many :foods, through: :order_details

  validates :rceipt_number,   presence: true
  validates :total_price,     presence: true
  validates :consumption_tax, presence: true
  validates :progress_status, presence: true

  enum progress_status: {
    orde: 0,
    complete: 1,
    delivered: 2
  }
end
