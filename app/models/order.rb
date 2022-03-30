class Order < ApplicationRecord
  require "date"
  require "securerandom"
  require "bigdecimal"

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
    delivered: 2,
  }

  # rubocop:disable all
  def self.create_order_history(user)
    ActiveRecord::Base.transaction do
      # 注文履歴を作成
      user.orders.create!(
        user_id: user.id,
        rceipt_number: "#{Date.today.day} #{SecureRandom.alphanumeric(3)}",
        total_price: user.cart.total_price,
        consumption_tax: (BigDecimal(user.cart.total_price) * BigDecimal(ENV["CONSUMPTION_TAX"])).ceil,
        progress_status: "orde",
      )
      # カート詳細から注文履歴詳細を作成
      user.cart_details.map do |cart_detail|
        OrderDetail.create!(
          order_id: user.orders.last.id,
          food_id: cart_detail.food_id,
          count: cart_detail.count,
        )
      end

      user.cart.destroy
    end
  end
  # rubocop:disable all
end
