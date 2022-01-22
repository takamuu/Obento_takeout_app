FactoryBot.define do
  factory :cart_detail do
    association :food, factory: :food
    association :cart, factory: :cart
    count { 1 }
  end
end
