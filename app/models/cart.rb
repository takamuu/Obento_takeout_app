class Cart < ApplicationRecord
  belongs_to :user
  has_many :cart_details, dependent: :destroy
  has_many :foods, through: :cart_details
  has_many :cart_details_foods, through: :cart_details, source: :food

  validates :total_price, presence: true

  # カート情報を取得
  def user_has_cart_info
    cart_info = []
    cart_hash = {}
    cart_details.each do |info|
      cart_hash["food"] = info.food
      cart_hash["count"] = info.count
      cart_info.push(cart_hash)
      cart_hash = {}
    end
    cart_info.sort_by! {|c| c["food"]["id"] }
  end

  # 追加するフードとカートにあるフードのレストランが違う場合
  def self.check_other_restaurant?(user, food)
    user.cart_details.first.food.restaurant.id != food.restaurant.id if user.cart_details.present?
  end

  # カートとカート詳細が存在するorしないで処理を分岐する
  def self.check_users_cart?(user, food, food_count)
    # カートが存在する && カート詳細が存在する場合
    if user.cart.present? && user.cart_details.present?
      # 追加するフードがカート詳細の中に存在するか？
      food_exists_in_cart_details?(user, food, food_count)
      # カートが存在する ＆& カート詳細が存在しない場合
    elsif user.cart.present? && user.cart_details.blank?
      CartDetail.create_cart_details(user, food, food_count)
    # カートが存在しない && カート詳細も存在しない
    elsif user.cart.blank?
      # カートとカート詳細を作成
      new_cart = Cart.create!(user_id: user.id, total_price: food.price * food_count)
      new_cart.cart_details.create!(food_id: food.id, count: food_count)
    end
    total_price_update(user)
  end

  # 追加するフードがカート詳細の中に存在するか判定
  def self.food_exists_in_cart_details?(user, food, food_count)
    # 存在する場合
    if user.cart.cart_details.find_by(food_id: food.id).present?
      # カート詳細を更新し、カートの合計金額を更新する
      CartDetail.update_cart_details(user, food, food_count)
    # 存在しない場合
    else
      # カート詳細を作成し、カートの合計金額を更新する
      CartDetail.create_cart_details(user, food, food_count)
    end
  end

  # カートを作成する
  def self.create_cart(user, ordered_food, food_count)
    create(user_id: user.id, total_price: ordered_food.price * food_count)
  end

  # カートの合計金額を更新
  def self.total_price_update(user)
    re_cart = Cart.find_by(user_id: user.id)
    re_cart.update!(total_price: re_cart.cart_details.inject(0) {|result, detail| result + (detail.food.price * detail.count) })
  end

  # カートの合計金額を計算
  def self.calc_total_price(user)
    user.cart.cart_details.inject(0) {|result, detail| result + (detail.food.price * detail.count) }
  end
end
