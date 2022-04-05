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
    all_success = true
    transaction do
      # 注文履歴を作成
      all_success &= order_create!(user)
      # カート詳細から注文履歴詳細を作成
      all_success &= OrderDetail.order_details_create!(user)
      all_success &= user.cart.destroy!
      unless all_success
        raise ActiveRecord::Rollback
      end
    end
    all_success
  end

  def self.order_create!(user)
    user.orders.create!(
      user_id: user.id,
      rceipt_number: "#{Date.today.day} #{SecureRandom.alphanumeric(4)}", # rubocop:disable Rails/Date
      total_price: user.cart.total_price,
      consumption_tax: (BigDecimal(user.cart.total_price) * BigDecimal(ENV["CONSUMPTION_TAX"])).ceil,
      progress_status: "orde",
    )
  end
end
