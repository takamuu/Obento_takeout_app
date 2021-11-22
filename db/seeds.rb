Cart.delete_all
Order.delete_all
User.delete_all
Restaurant.delete_all
Food.delete_all
CartDetail.delete_all

#-----------------------------------------
# User
#-----------------------------------------
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

10.times do |n|
  name = Faker::Name.name
  email = "example-#{n+1}@example.com"
  kana = "カナテスト#{n+1}"
  User.create!(
    name: name,
    email: email,
    kana: kana,
    password: "password",
    phone_number: "000-0000-000#{n+1}",
    status: 0,
    stripe_id: "00000"
  )
end

puts "ユーザーのテストデータを作成OK！".green

#-----------------------------------------
# Restaurant
#-----------------------------------------
10.times do |r|
  restaurant = Restaurant.create!(
    name: "レストラン#{r}",
    description: "美味しいお店",
    fee: 0.05,
    postal_code: 7000000,
    prefecture: "岡山県",
    city: "岡山市北区",
    block_building: "１",
    phone_number: "090-1111-2222",
    update_time: "15:00:00"
  )
end

puts "restaurantのテストデータを作成OK！".green

#-----------------------------------------
# Food
#-----------------------------------------
12.times do |f|
 food = Food.create!(
   restaurant_id: 1,
   name: "テスト弁当#{f}",
   food_description: "美味",
   price: 1000,
   sales_limit: 20,
   sales_status: 1
 )
end

puts "foodテストデータを作成OK！".green

#-----------------------------------------
# Order
#-----------------------------------------
5.times do |o|
 order = Order.create!(
   user_id: 1,
   rceipt_number: "AAAA#{o}",
   total_price: 3000,
   consumption_tax: 300,
   progress_status: 0
 )
end

puts "orderテストデータを作成OK！".green

#-----------------------------------------
# Cart
#-----------------------------------------
5.times do |c|
  cart = Cart.create!(
    user_id: c + 1,
    total_price: 1500
  )
end

puts "cartテストデータを作成OK！".green

#-----------------------------------------
# CartDetail
#-----------------------------------------
5.times do |t|
  cart_detail = CartDetail.create!(
    food_id: t + 1,
    cart_id: t + 1,
    count: t + 1,
  )
end

puts "cart_detailテストデータを作成OK！".green


