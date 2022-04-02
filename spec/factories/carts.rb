FactoryBot.define do
  factory :cart do
    association :user, factory: :user
    total_price { 1000 }
  end
end
