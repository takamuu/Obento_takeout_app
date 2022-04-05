class OrderDetailSerializer < ActiveModel::Serializer
  attributes :id, :count, :food_name, :food_price

  def food_name
    object.food.name
  end

  def food_price
    object.food.price
  end
end
