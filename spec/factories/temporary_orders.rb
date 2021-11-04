FactoryBot.define do
  factory :temporary_order do
    food { nil }
    restaurant { nil }
    count { 1 }
    active { false }
  end
end
