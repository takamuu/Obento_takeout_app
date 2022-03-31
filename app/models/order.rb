class Order < ApplicationRecord
  require "date"
  require "securerandom"
  require "bigdecimal"

  belongs_to :user
  has_many :order_details, dependent: :destroy

  validates :rceipt_number,   presence: true
  validates :total_price,     presence: true
  validates :consumption_tax, presence: true
  validates :progress_status, presence: true

  enum progress_status: {
    orde: 0,
    complete: 1,
    delivered: 2,
  }

  def self.check_users_order_history?(user)
    user.orders.present? && user.order_details.present?
  end

  def self.confirm_cart_presence?(user_id)
    users_cart = Cart.find_by(user_id: user_id)
    users_cart.present? && CartDetail.find_by(cart_id: users_cart.id).present?
  end

  def self.create_order_history(user)
    ActiveRecord::Base.transaction do
      # 注文履歴を作成
      order_create!(user)
      # カート詳細から注文履歴詳細を作成
      order_details_create!(user)
      user.cart.destroy!
    end
  end

  def self.order_create!(user)
    user.orders.create!(
      user_id: user.id,
      rceipt_number: "#{Date.today.day} #{SecureRandom.alphanumeric(3)}", # rubocop:disable Rails/Date
      total_price: user.cart.total_price,
      consumption_tax: (BigDecimal(user.cart.total_price) * BigDecimal(ENV["CONSUMPTION_TAX"])).ceil,
      progress_status: "orde",
    )
  end

  def self.order_details_create!(user)
    user.cart_details.each do |cart_detail|
      OrderDetail.create!(
        order_id: user.orders.last.id,
        food_id: cart_detail.food_id,
        count: cart_detail.count,
      )
    end
  end
end
