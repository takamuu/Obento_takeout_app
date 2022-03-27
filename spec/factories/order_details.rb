FactoryBot.define do
  factory :order_detail do
    association :food, factory: :food
    association :order, factory: :order
    count { 1 }
  end
end
