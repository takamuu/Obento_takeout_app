FactoryBot.define do
  factory :restaurant do
    name { "テストレストラン" }
    description { "説明" }
    fee { 100 }
    postal_code { 100 }
    prefecture_code { 100 }
    prefecture { "test" }
    city { "test" }
    block_building { "test" }
    phone_number { "000" }
    update_time { "12:00" }
  end
end
