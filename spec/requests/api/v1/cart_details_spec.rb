require "rails_helper"

RSpec.describe "Api::V1::CartDetails", type: :request do
  let(:current_user) { create(:user) }
  let(:headers) { current_user.create_new_auth_token }
  let(:user) { create(:user) }

  describe "DELETE #destroy" do
    let(:delete_params) { { id: @cart_details.food.id } }

    context "トークン認証情報がある場合" do
      subject { delete(api_v1_cart_detail_path(delete_params), headers: headers) }

      context "カートが存在する場合 && カート詳細が存在する場合" do
        before do
          @cart = create(:cart, user_id: current_user.id, total_price: 1000)
          @cart_details = create(:cart_detail, cart_id: current_user.cart.id)
        end

        it "ok(200)がレスポンスされる" do
          subject
          expect(response).to have_http_status(:ok)
        end

        it "カート詳細情報が削除されること" do
          expect { subject }.to change { CartDetail.count }.by(-1)
        end

        it "カートの合計金額が更新されること" do
          expect { subject }.to change { @cart.reload.total_price }.from(1000).to(0)
        end
      end
    end

    context "トークン認証情報がない場合" do
      subject { delete(api_v1_cart_detail_path(delete_params)) }

      before {
        create(:cart, user_id: current_user.id)
        @cart_details = create(:cart_detail, cart_id: current_user.cart.id)
      }

      it "認証不可(401)がレスポンスされる" do
        subject
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "PATCH #update" do
    let(:update_params) { { cart_detail: { id: @cart_details.id, count: 2, food_id: @cart_details.food.id }, id: @cart_details.food.id } }

    context "トークン認証情報がある場合" do
      subject { patch(api_v1_cart_detail_path(update_params), headers: headers) }

      context "カートが存在する場合 && カート詳細が存在する場合" do
        before do
          @cart = create(:cart, user_id: current_user.id, total_price: 1000)
          @cart_details = create(:cart_detail, cart_id: current_user.cart.id)
        end

        it "ok(200)がレスポンスされる" do
          subject
          expect(response).to have_http_status(:ok)
        end

        it "カート詳細情報が更新されること" do
          expect { subject }.to change { @cart_details.reload.count }.by(2)
        end

        it "カートの合計金額が更新されること" do
          expect { subject }.to change { @cart.reload.total_price }.from(1000).to(3000)
        end
      end
    end

    context "トークン認証情報がない場合" do
      subject { patch(api_v1_cart_detail_path(update_params)) }

      before do
        create(:cart, user_id: current_user.id)
        @cart_details = create(:cart_detail, cart_id: current_user.cart.id)
      end

      it "認証不可(401)がレスポンスされる" do
        subject
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "PUT #replace" do
    let(:update_params) { { cart_detail: { cart_id: @cart.id, count: 1, food_id: @other_restaurant_food.id }, id: @other_restaurant_food.id } }
    context "トークン認証情報がある場合" do
      subject { put(api_v1_path(update_params), headers: headers) }

      context "カートが存在する場合 && カート詳細が存在する場合" do
        before do
          @restaurant = create(:restaurant)
          @first_food = create(:food, restaurant_id: @restaurant.id)
          @second_food = create(:food, restaurant_id: @restaurant.id)
          @cart = create(:cart, user_id: current_user.id, total_price: 2000)
          create(:cart_detail, food_id: @first_food.id, cart_id: @cart.id)
          create(:cart_detail, food_id: @second_food.id, cart_id: @cart.id)
          @other_restaurant_food = create(:food)
        end

        it "ok(200)がレスポンスされる" do
          subject
          expect(response).to have_http_status(:ok)
        end

        it "存在していたカート詳細が全て削除され、別のレストランのカート詳細が作成されること" do
          expect { subject }.to change { CartDetail.count }.from(2).to(1)
        end

        it "カートの合計金額が更新されること" do
          expect { subject }.to change { @cart.reload.total_price }.from(2000).to(1000)
        end
      end
    end

    context "トークン認証情報がない場合" do
      subject { put(api_v1_path(update_params)) }

      before do
        @cart = create(:cart, user_id: current_user.id, total_price: 1000)
        create(:cart_detail, cart_id: current_user.cart.id)
        @other_restaurant_food = create(:food)
      end

      it "認証不可(401)がレスポンスされる" do
        subject
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
