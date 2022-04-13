FactoryBot.define do
  factory :user do
    email { Faker::Internet.unique.email }
    password { Faker::Internet.password(min_length: 8) }
    name { Faker::Name.name }
    kana { "カナテスト" }
    phone_number { "000-0000-0000" }
    status { 1 }
  end
end
