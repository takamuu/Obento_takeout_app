class OrderSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :rceipt_number, :total_price, :consumption_tax, :progress_status, :created_at
  has_many :order_details

  class OrderDetailSerializer < ActiveModel::Serializer
    attributes :id, :order_id, :food_id, :count
  end
end
