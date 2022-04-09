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

      context "カートが存在する場合 && カート詳細が存在しない場合" do
        let(:delete_params) { { id: @cart_details.id } }
        before do
          create(:cart, user_id: current_user.id)
          @cart_details = create(:cart_detail)
        end

        it "no_content(204)がレスポンスされる" do
          subject
          expect(response).to have_http_status(:no_content)
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
          expect { subject }.to change { @cart_details.reload.count }.by(1)
        end

        it "カートの合計金額が更新されること" do
          expect { subject }.to change { @cart.reload.total_price }.from(1000).to(2000)
        end
      end

      context "カートが存在する場合 && カート詳細が存在しない場合" do
        let(:update_params) { { cart_detail: { id: nil, count: nil, food_id: nil }, id: 1 } }

        before do
          @cart = create(:cart, user_id: current_user.id, total_price: 1000)
          @food = create(:food)
        end

        it "no_content(204)がレスポンスされる" do
          subject
          expect(response).to have_http_status(:no_content)
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
end
