Order.delete_all
User.delete_all
Food.delete_all
Restaurant.delete_all


user_params = [
  {
    name: "名前テスト",
    email: "example@example.com",
    password: "password",
    kana: "カナテスト",
    phone_number: "000-0000-0000",
    status: 0,
    stripe_id: "12345"
  }
]


User.create!(user_params)
puts "ユーザーの初期データの投入に成功しました!"


Restaurant.create!(name: "res1", description: "美味しいお店", fee: 0.05, postal_code: 7000000, prefecture: "岡山県", city: "岡山市北区", block_building: "１", phone_number: "090-1111-2222", update_time: "15:00:00")
Restaurant.create!(name: "res2", description: "美味しいお店", fee: 0.05, postal_code: 7000000, prefecture: "岡山県", city: "岡山市北区", block_building: "１", phone_number: "090-1111-2222", update_time: "15:00:00")
Restaurant.create!(name: "res3", description: "美味しいお店", fee: 0.05, postal_code: 7000000, prefecture: "岡山県", city: "岡山市北区", block_building: "１", phone_number: "090-1111-2222", update_time: "15:00:00")

puts "restaurantデータの投入に成功しました！"


Food.create!(restaurant_id: 1, name: "牛タン弁当", food_description: "格別", price: 1500, sales_limit: 20, sales_status: 1)
Food.create!(restaurant_id: 1, name: "牛焼き肉弁当", food_description: "特別", price: 1200, sales_limit: 20, sales_status: 1)

puts "foodデータの投入に成功しました！"


Order.create!(user_id: 1, rceipt_number: "AAAA", total_price: 3000, consumption_tax: 300, progress_status: 0)
Order.create!(user_id: 1, rceipt_number: "BBBB", total_price: 3000, consumption_tax: 300, progress_status: 1)
Order.create!(user_id: 1, rceipt_number: "CCCC", total_price: 3000, consumption_tax: 300, progress_status: 2)

puts "orderデータの投入に成功しました！"