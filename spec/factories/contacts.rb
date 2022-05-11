FactoryBot.define do
  factory :contact do
    association :user, factory: :user
    title { "MyString" }
    content { "MyText" }
    remote_ip { "MyString" }
    status { 1 }
  end
end
