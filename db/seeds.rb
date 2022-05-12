require "securerandom"

CartDetail.delete_all
Cart.delete_all
Order.delete_all
User.delete_all
Food.delete_all
Restaurant.delete_all

# User
USER_NUM = 5

# Restaurant
RESTAURANT_NUM = 10

# Food
FOOD_NUM = 12
NUMBER_OF_REPEATS = 3

# CartDetail
RCEIPT_NUMBER = SecureRandom.alphanumeric(3)

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
    stripe_id: "12345",
  },
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
    stripe_id: "00000",
  )
end

Rails.logger.debug "ユーザーのテストデータを作成OK！".green

#-----------------------------------------
# Restaurant
#-----------------------------------------
Restaurant.create!(
  name: "HappyHour",
  description: "焼肉弁当専門店",
  fee: 0.05,
  postal_code: 7_000_000,
  prefecture: "岡山県",
  city: "岡山市北区",
  block_building: "中央町１",
  phone_number: "090-1111-2222",
  image: "/images/restaurants/HappyHour.jpg",
  update_time: "15:00:00",
)
Restaurant.create!(
  name: "BOHEME BURGER",
  description: "ハンバーガー専門店",
  fee: 0.05,
  postal_code: 7_000_000,
  prefecture: "岡山県",
  city: "岡山市北区",
  block_building: "駅前町１",
  phone_number: "090-1111-2222",
  image: "/images/restaurants/Boheme.jpg",
  update_time: "15:00:00",
)
Restaurant.create!(
  name: "117 CAFE",
  description: "ピザ・パスタ専門店",
  fee: 0.05,
  postal_code: 7_000_000,
  prefecture: "岡山県",
  city: "岡山市北区",
  block_building: "田町１",
  phone_number: "090-1111-2222",
  image: "/images/restaurants/117Cafe.jpg",
  update_time: "15:00:00",
)

Rails.logger.debug "restaurantのテストデータを作成OK！".green

#-----------------------------------------
# Food
#-----------------------------------------
Food.create!(
  restaurant_id: 1,
  name: "牛タン弁当",
  food_description: "お肉のやわらかさと風味が違います。ワンランク上の極旨牛タンは絶品です！",
  price: 800,
  image: "/images/foods/1-BeefTongue.jpg",
  sales_limit: 20,
  sales_status: 1,
)
Food.create!(
  restaurant_id: 1,
  name: "上カルビ弁当",
  food_description: "千屋牛上カルビの旨味を堪能下さい。脂身にしつこさがなくそれでいて濃厚な味わいです！",
  price: 1500,
  image: "/images/foods/1-BeefRibsBento.jpg",
  sales_limit: 20,
  sales_status: 1,
)
Food.create!(
  restaurant_id: 1,
  name: "チキン南蛮弁当",
  food_description: "歯応え・コク・風味がある備中高原鶏を使用したチキン南蛮弁当です！※白米付きです",
  price: 800,
  image: "/images/foods/1-ChickenNanbanBento.jpg",
  sales_limit: 20,
  sales_status: 1,
)
Food.create!(
  restaurant_id: 1,
  name: "唐揚げ弁当",
  food_description: "薄衣でサクサク、もも肉プリプリの唐揚げ弁当です！
※白米付きです",
  price: 700,
  image: "/images/foods/1-FriedChickenBento.jpg",
  sales_limit: 20,
  sales_status: 1,
)
Food.create!(
  restaurant_id: 1,
  name: "焼肉弁当",
  food_description: "濃厚な味わいとやわらかさが楽しめる焼肉弁当です！
※白米付きです",
  price: 700,
  image: "/images/foods/1-BeefYakinikuBento.jpg",
  sales_limit: 20,
  sales_status: 1,
)
Food.create!(
  restaurant_id: 1,
  name: "ほうれん草カレー弁当",
  food_description: "地産のほうれん草を使用し、しっかり煮込んだうまカレーです！",
  price: 700,
  image: "/images/foods/1-SpinachCurry.jpg",
  sales_limit: 20,
  sales_status: 1,
)
Food.create!(
  restaurant_id: 2,
  name: "ダブルビーフバーガー",
  food_description: "オーロラソースがぴったりのボリュームたっぷりバーガーです！",
  price: 700,
  image: "/images/foods/2-DoubleBeefBurger.jpg",
  sales_limit: 20,
  sales_status: 1,
)
Food.create!(
  restaurant_id: 2,
  name: "トールビーフバーガー",
  food_description: "ビルのようにそびえ立つ規格外のボリュームバーガー！",
  price: 700,
  image: "/images/foods/2-TallBeefBurger.jpg",
  sales_limit: 20,
  sales_status: 1,
)
Food.create!(
  restaurant_id: 2,
  name: "和牛バーガー",
  food_description: "ミートに和牛を使用した超贅沢和牛バーガーです！",
  price: 700,
  image: "/images/foods/2-WagyuBeefBurger.jpg",
  sales_limit: 20,
  sales_status: 1,
)
Food.create!(
  restaurant_id: 2,
  name: "チェダーチーズ＆トマトベーコンバーガー",
  food_description: "濃厚チェダーチーズと地産トマトにベーコンをプラスしたバーガー！",
  price: 700,
  image: "/images/foods/2-CheddarTomatoBaconBarger.jpg",
  sales_limit: 20,
  sales_status: 1,
)
Food.create!(
  restaurant_id: 2,
  name: "イカ墨フィッシューバーガー",
  food_description: "バンズにイカ墨を使用し、カリッとしたフライドフィッシュを挟んだシーフードバーガー！",
  price: 700,
  image: "/images/foods/2-SquidInkCheeseFishBarger.jpg",
  sales_limit: 20,
  sales_status: 1,
)
Food.create!(
  restaurant_id: 2,
  name: "トマト＆オニオン＆ポテトセット",
  food_description: "トマト＆オニオンバーガーとポテトのお得なセットです！",
  price: 700,
  image: "/images/foods/2-TomatoOnionPotato-set.jpg",
  sales_limit: 20,
  sales_status: 1,
)
Food.create!(
  restaurant_id: 3,
  name: "クリームソースパスタ",
  food_description: "生クリームと牛乳を煮込んだコクのあるクリームソースです！",
  price: 700,
  image: "/images/foods/3-PastaCreamSauce.jpg",
  sales_limit: 20,
  sales_status: 1,
)
Food.create!(
  restaurant_id: 3,
  name: "ミートソースパスタ",
  food_description: "丸一日煮込んだ旨味たっぷりミートソースです！",
  price: 700,
  image: "/images/foods/3-PastaMeatSauce.jpg",
  sales_limit: 20,
  sales_status: 1,
)
Food.create!(
  restaurant_id: 3,
  name: "ペンネ",
  food_description: "イタリア産を使用した本場のペンネ！",
  price: 700,
  image: "/images/foods/3-Penne.jpg",
  sales_limit: 20,
  sales_status: 1,
)
Food.create!(
  restaurant_id: 3,
  name: "グラタン",
  food_description: "ホワイトソースを使用した中はとろっ、外はカリッとしたグラタンです！",
  price: 700,
  image: "/images/foods/3-Gratin.jpg",
  sales_limit: 20,
  sales_status: 1,
)
Food.create!(
  restaurant_id: 3,
  name: "ベーコン＆マッシュルームピザ",
  food_description: "ベーコンとマッシュルームたっぷりのpizzaです！",
  price: 700,
  image: "/images/foods/3-PizzaBaconMushroom.jpg",
  sales_limit: 20,
  sales_status: 1,
)
Food.create!(
  restaurant_id: 3,
  name: "バーベキューピザ",
  food_description: "バーベキュー味の濃厚pizzaです！",
  price: 700,
  image: "/images/foods/3-PizzaBarbecue.jpg",
  sales_limit: 20,
  sales_status: 1,
)

Rails.logger.debug "foodテストデータを作成OK！".green

#-----------------------------------------
# Cart
#-----------------------------------------
Cart.create!(
  user_id: 1,
  total_price: 2300,
)

Cart.create!(
  user_id: 2,
  total_price: 1600,
)

Rails.logger.debug "cartテストデータを作成OK！".green

#-----------------------------------------
# CartDetail
#-----------------------------------------
CartDetail.create!(
  food_id: 1,
  cart_id: 1,
  count: 1,
)

CartDetail.create!(
  food_id: 2,
  cart_id: 1,
  count: 1,
)

CartDetail.create!(
  food_id: 1,
  cart_id: 2,
  count: 2,
)

Rails.logger.debug "cart_detailテストデータを作成OK！".green

#-----------------------------------------
# Order
#-----------------------------------------
Order.create!(
  user_id: 1,
  rceipt_number: "16 #{RCEIPT_NUMBER}",
  total_price: 2300,
  consumption_tax: 300,
  progress_status: 0,
)

Rails.logger.debug "orderテストデータを作成OK！".green

#-----------------------------------------
# OrderDetail
#-----------------------------------------
OrderDetail.create!(
  food_id: 1,
  order_id: 1,
  count: 1,
)

OrderDetail.create!(
  food_id: 2,
  order_id: 1,
  count: 1,
)

Rails.logger.debug "cart_detailテストデータを作成OK！".green

#-----------------------------------------
# Contact
#-----------------------------------------
Contact.create!(
  user_id: 1,
  title: "問い合わせテスト",
  content: "問い合わせデータ内容です",
  remote_ip: "192.168.0.1",
  status: 0,
)

Rails.logger.debug "contactテストデータを作成OK！".green
