require "rails_helper"

RSpec.describe "Api::V1::CartDetails", type: :request do
  let(:current_user) { create(:user) }
  let(:headers) { current_user.create_new_auth_token }
  let(:user) { create(:user) }

  describe "DELETE #destroy" do
    let(:delete_params) { @cart_details.food }

    context "トークン認証情報がある場合" do
      subject { delete(api_v1_cart_detail_path(delete_params), headers: headers) }

      context "カートが存在する場合 && 商品が存在する場合" do
        before {
          create(:cart, user_id: current_user.id)
          @cart_details = create(:cart_detail, cart_id: current_user.cart.id)
        }

        it "ok(200)がレスポンスされる" do
          subject
          expect(response).to have_http_status(:ok)
        end

        it "カート詳細情報が削除されること" do
          expect { subject }.to change { CartDetail.count }.by(-1)
        end
      end

      context "カートが存在する場合 && 商品が存在しない場合" do
        let(:delete_params) { @food }
        before {
          create(:cart, user_id: current_user.id)
          @food = create(:food)
        }

        it "カート詳細情報は削除できないこと" do
          expect { subject }.not_to change { CartDetail.count }
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
end
