require "rails_helper"

RSpec.describe Cart, type: :model do
  describe "total_price" do
    let(:total_price_method) { Cart.new.total_price }

    context "ユーザーがカート詳細情報を持っている時" do
      let(:toral_price) { 10000 }

      before {
        create(:user)
        create(:cart, user_id: user.id)
        create(:cart_detail, cart_id: cart.id)
        create(:cart_detail, cart_id: cart.id)
        create(:cart_detail, cart_id: cart.id)
      }

      it "その合計金額を取得する" do
        # 合計金額 = ロジック = user.cart.cart_details.price.sum
        expect(total_price_method).to eq(toral_price)
      end
    end
  end

  # before {
  #   binding.pry
  #   @user = create(:user)
  #   @cart = create(:cart, user_id: @user.id)
  #   create(:cart_detail, cart_id: @cart.id)
  #   create(:cart_detail, cart_id: @cart.id)
  #   create(:cart_detail, cart_id: @cart.id)
  # }

  #   it "cartが持つtotal_priceが正常に計算されている" do
  #     binding.pry
  #     # subject
  #     # json = JSON.parse(response.body)
  #     # expect(response).to have_http_status(:ok)
  #     # expect(json.size).to eq 1
  #     # expect(json.sum {|c| c["price"] }).to eq current_user.cart.total_price
  #   end
  # end
end
