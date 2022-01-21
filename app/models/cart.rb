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
      cart_hash["name"] = info.food.name
      cart_hash["count"] = info.count
      cart_hash["price"] = info.food.price
      cart_info.push(cart_hash)
      cart_hash = {}
    end
    # カート合計金額
    # cart_hash["tota_price"] = ロジック
    # {cart_details: [{}], total_price: 10000}

    cart_info
  end

  # カートの合計金額を更新
  def self.calc_total_price(current_user)
    @total_price = 0
    current_user.cart.cart_details.each do |detail|
      @total_price += detail.food.price * detail.count
    end
    @total_price
  end

  # 追加するフードを含むカート詳細を取得
  def self.acquire_cart_details(current_user, ordered_food)
    current_user.cart.cart_details.find_by(food_id: ordered_food.id)
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
end
