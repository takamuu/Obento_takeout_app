FactoryBot.define do
  factory :contact do
    user_id { 1 }
    title { "MyString" }
    content { "MyText" }
    remote_ip { "MyString" }
    status { 1 }
  end
end
