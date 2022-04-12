class Cart < ApplicationRecord
  belongs_to :user
  has_many :cart_details, dependent: :destroy
  has_many :foods, through: :cart_details
  has_many :cart_details_foods, through: :cart_details, source: :food

  validates :total_price, presence: true

  # 追加するフードとカートにあるフードのレストランが違う場合
  def self.check_other_restaurant?(user, food)
    user.cart_details.first.food.restaurant.id != food.restaurant.id if user.cart_details.present?
  end

  def self.create_cart_and_cart_details(user, food, food_count)
    # カートがない場合は作成
    user.build_cart(total_price: calc_total_price(food, food_count)).save! if user.cart.blank?

    # 追加するフードのカート詳細がない場合
    if food_exists_in_cart_details?(user, food)
      CartDetail.new_instance(user, food, food_count)
    else
      CartDetail.add_instance(user, food, food_count)
    end
  end

  # 追加するフードがカート詳細の中に存在するか判定
  def self.food_exists_in_cart_details?(user, food)
    user.cart.cart_details.find_by(food_id: food.id).blank?
  end

  # カートを作成する
  def self.create_cart(user, food, food_count)
    create(user_id: user.id, total_price: calc_total_price(food, food_count))
  end

  def self.calc_total_price(food, food_count)
    food.price * food_count
  end

  # カートの合計金額を更新
  def total_price_update!
    update!(total_price: calc_cart_details_total_price)
  end

  # カート詳細の合計金額を計算
  def calc_cart_details_total_price
    cart_details.inject(0) {|result, detail| result + calc_total_price(detail.food, detail.count) }
  end

  def self.fetch_restaurant(user, food)
    { existing_restaurant_name: user.cart_details.first.food.restaurant.name, new_restaurant_name: food.restaurant.name }
  end
end
