FactoryBot.define do
  factory :food do
    association :restaurant, factory: :restaurant
    sequence(:name) {|n| "テストフード#{n}" }
    food_description { "テスト説明" }
    price { 1000 }
    sales_limit { 20 }
    sales_status { 1 }
  end
end
