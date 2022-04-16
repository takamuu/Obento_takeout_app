class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :kana, :phone_number
end
