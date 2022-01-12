require "rails_helper"

RSpec.describe "Api::V1::Carts", type: :request do
  let(:current_user) { create(:user) }
  let(:headers) { current_user.create_new_auth_token }
  let(:user) { create(:user) }

  describe "GET #index" do
    subject { get(api_v1_carts_path, headers: headers) }

    context "トークン認証情報がない場合" do
      subject { get(api_v1_carts_path) }

      it "認証不可(401)がレスポンスされる" do
        subject
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "トークン認証情報がある場合" do
      context "カートが存在しない場合" do
        it "no_content(204)がレスポンスされる" do
          subject
          expect(response).to have_http_status(:no_content)
        end
      end

      context "カートが存在する場合 && 商品が存在する場合" do
        before {
          create(:cart, user_id: current_user.id)
          create(:cart_detail, cart_id: current_user.cart.id)
        }

        it "ok(200)がレスポンスされる" do
          subject
          expect(response).to have_http_status(:ok)
        end

        it "取得したカート情報がレスポンスされる" do
          subject
          json = JSON.parse(response.body)
          expect(json[0]["name"]).to be_present
          expect(json[0]["count"]).to be_present
          expect(json[0]["price"]).to be_present
          # expect(json["tota_price"]).to be_present
        end
      end

      context "カートが存在する場合 && 商品が存在しない場合" do
        before { create(:cart, user_id: current_user.id) }

        xit "no_content(204)がレスポンスされる" do
          # TODO
        end
      end
    end
  end

  describe "POST #create" do
    subject { post(api_v1_carts_path, params: cart_detail_params, headers: headers) }
    # let(:cart_params) { { cart: attributes_for(:cart_detail_params, user_id: current_user.id)}}

    let(:cart_detail_params) { { cart_detail: attributes_for(:cart_detail, user_id: current_user.id) } }

    context "トークン認証情報がない場合" do
      subject { post(api_v1_carts_path) }

      it "認証不可(401)がレスポンスされる" do
        subject
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "トークン認証情報がある && カートが存在しない" do
      it "カートとカート詳細情報を作成する" do
        subject
        expect(response).to have_http_status(:ok)
        expect(response.body).to eq ""
      end
    end

    context "トークン認証情報がある && カートが存在する" do
      # let!(:cart) { create(:cart, user_id: current_user.id) }
      # let!(:cart_detail) { create(:cart_detail, cart_id: current_user.cart.id) }
      it "カートとカート詳細情報を正常に更新する" do
        subject
        json = JSON.parse(response.body)
        expect(response).to have_http_status(:ok)
        expect(json.size).to eq 1
        expect(json.sum {|c| c["price"] }).to eq current_user.cart.total_price
      end
    end
  end

  xdescribe "PUT /replace" do
  end
end
