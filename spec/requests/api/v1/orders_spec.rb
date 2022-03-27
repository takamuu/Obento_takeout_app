require "rails_helper"

RSpec.describe "Api::V1::Orders", type: :request do
  let(:current_user) { create(:user) }
  let(:headers) { current_user.create_new_auth_token }
  let(:user) { create(:user) }

  describe "GET #index" do
    context "トークン認証情報がある場合" do
      subject { get(api_v1_orders_path, headers: headers) }

      context "注文履歴が存在する場合 && 注文履歴詳細が存在する場合" do
        before {
          @order = create(:order, user_id: current_user.id)
          @order_details = create(:order_detail, order_id: @order.id)
        }

        it "ok(200)がレスポンスされる" do
          subject
          expect(response).to have_http_status(:ok)
        end

        it "取得した購入履歴情報がレスポンスされる" do
          subject
          json = JSON.parse(response.body)
          expect(json[0]["user_id"]).to be_present
          expect(json[0]["rceipt_number"]).to be_present
          expect(json[0]["total_price"]).to be_present
          expect(json[0]["consumption_tax"]).to be_present
          expect(json[0]["progress_status"]).to be_present
        end
      end

      context "購入履歴が存在する場合 && 購入履歴詳細が存在しない場合" do
        before { create(:order, user_id: current_user.id) }

        it "no_content(204)がレスポンスされる" do
          subject
          expect(response).to have_http_status(:no_content)
        end
      end

      context "購入履歴が存在しない場合" do
        it "no_content(204)がレスポンスされる" do
          subject
          expect(response).to have_http_status(:no_content)
        end
      end
    end

    context "トークン認証情報がない場合" do
      subject { get(api_v1_carts_path) }

      it "認証不可(401)がレスポンスされる" do
        subject
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
