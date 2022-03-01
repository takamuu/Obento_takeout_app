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

  # カートの合計金額を更新
  def self.calc_total_price(user)
    user.cart.cart_details.inject(0) {|result, detail| result + (detail.food.price * detail.count) }
  end

  # 追加するフードを含むカート詳細を取得
  def self.acquire_cart_details(user, ordered_food)
    user.cart.cart_details.find_by(food_id: ordered_food.id)
  end

  # カートを作成する
  def self.create_cart(user, ordered_food, cart_details_params)
    create(user_id: user.id, total_price: ordered_food.price * cart_details_params[:count].to_i)
  end

  # カート詳細があれば更新、なければ作成
  def self.update_or_create_cart_details(cart_details, user, cart_details_params)
    if cart_details.present?
      cart_details.update!(count: cart_details.count + cart_details_params[:count].to_i)
    else
      user.cart.cart_details.create!(cart_details_params)
    end
  end

  # カート詳細を更新
  def self.updata_cart_details(cart_details, user, cart_details_params)
    cart_details.update!(count: cart_details.count + cart_details_params[:count].to_i)
  end
end
