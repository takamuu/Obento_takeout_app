FactoryBot.define do
  factory :cart do
    user { nil }
    temporary_order { nil }
    total_price { 1 }
  end
end
