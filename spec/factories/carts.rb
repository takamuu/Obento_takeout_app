FactoryBot.define do
  factory :cart do
    association :user, factory: :user
    total_price { 0 }
  end
end
