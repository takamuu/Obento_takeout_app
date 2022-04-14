FactoryBot.define do
  factory :user do
    email { Faker::Internet.unique.free_email }
    password { Faker::Internet.password(min_length: 8) }
    name { Faker::Name.name }
    sequence(:kana) {|n| "カナテスト#{n}" }
    sequence(:phone_number) {|n| "000-0000-#{n}" }
    status { 1 }
  end
end
