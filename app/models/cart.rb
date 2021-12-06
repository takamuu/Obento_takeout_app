class Cart < ApplicationRecord
  belongs_to :user
  has_many :cart_details, dependent: :destroy
  has_many :foods, through: :cart_details
  has_many :cart_details_foods, through: :cart_details, source: :food

  validates :user_id, uniqueness: true
  validates :total_price, presence: true, numericality: { greater_than: 0 }

  # active等削除したので、後で要確認
  def save_with_update_temporary_orders!(temporary_orders)
    ActiveRecord::Base.transaction do
      temporary_orders.each do |temporary_order|
        temporary_order.update_attributes!(active: false, order: self)
      end
      self.save!
    end
  end
end
