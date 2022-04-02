require "securerandom"

FactoryBot.define do
  factory :order do
    association :user, factory: :user
    sequence(:rceipt_number) { "16 #{SecureRandom.alphanumeric(3)}" }
    total_price { 2300 }
    consumption_tax { 300 }
    progress_status { "orde" }
  end
end
