class CartDetailSerializer < ActiveModel::Serializer
  attributes :count, :food

  def food
    object.food
  end
end
