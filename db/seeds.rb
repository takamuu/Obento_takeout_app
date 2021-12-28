CartDetail.delete_all
Cart.delete_all
Order.delete_all
User.delete_all
Food.delete_all
Restaurant.delete_all

# User
USER_NUM = 10

# Restaurant
RESTAURANT_NUM = 10

# Food
FOOD_NUM = 12
NUMBER_OF_REPEATS = 3

# Order
ORDER_NUM = 5

# Cart
CART_NUM = 5

# CartDetail
CART_DETAIL_NUM = 5

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

USER_NUM.times do |n|
  name = Faker::Name.name
  email = "example-#{n + 1}@example.com"
  kana = "カナテスト#{n + 1}"
  User.create!(
    name: name,
    email: email,
    kana: kana,
    password: "password",
    phone_number: "000-0000-000#{n + 1}",
    status: 0,
    stripe_id: "00000"
  )
end

Rails.logger.debug "ユーザーのテストデータを作成OK！".green

#-----------------------------------------
# Restaurant
#-----------------------------------------
RESTAURANT_NUM.times do |r|
  restaurant = Restaurant.create!(
    name: "レストラン#{r + 1}",
    description: "美味しいお店",
    fee: 0.05,
    postal_code: 7_000_000,
    prefecture: "岡山県",
    city: "岡山市北区",
    block_building: "１",
    phone_number: "090-1111-2222",
    update_time: "15:00:00"
  )
end

Rails.logger.debug "restaurantのテストデータを作成OK！".green

#-----------------------------------------
# Food
#-----------------------------------------
NUMBER_OF_REPEATS.times do |n|
  FOOD_NUM.times do |f|
    food = Food.create!(
      restaurant_id: n + 1,
      name: "テスト弁当#{f + 1}",
      food_description: "美味",
      price: 1000,
      sales_limit: 20,
      sales_status: 1
    )
  end
end

Rails.logger.debug "foodテストデータを作成OK！".green

#-----------------------------------------
# Order
#-----------------------------------------
ORDER_NUM.times do |o|
  order = Order.create!(
    user_id: 1,
    rceipt_number: "AAAA#{o}",
    total_price: 3000,
    consumption_tax: 300,
    progress_status: 0
  )
end

Rails.logger.debug "orderテストデータを作成OK！".green

#-----------------------------------------
# Cart
#-----------------------------------------
CART_NUM.times do |c|
  cart = Cart.create!(
    user_id: c + 1,
    total_price: 1500
  )
end

Rails.logger.debug "cartテストデータを作成OK！".green

#-----------------------------------------
# CartDetail
#-----------------------------------------
CART_DETAIL_NUM.times do |t|
  cart_detail = CartDetail.create!(
    food_id: t + 1,
    cart_id: t + 1,
    count: t + 1
  )
end

Rails.logger.debug "cart_detailテストデータを作成OK！".green
