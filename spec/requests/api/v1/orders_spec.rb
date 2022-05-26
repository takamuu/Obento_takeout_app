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
          expect(json[0].keys).to eq %w[id user_id rceipt_number total_price consumption_tax progress_status restaurant_name restaurant created_at
            order_details]
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

  describe "POST #create" do
    let(:order_params) { { user_id: current_user.id } }

    context "トークン認証情報がある場合" do
      subject { post(api_v1_orders_path, params: order_params, headers: headers) }

      context "paramsのユーザーIDが正しい" do
        context "カートとカート詳細が存在するとき" do
          before {
            @cart = create(:cart, user_id: current_user.id)
            @cart_details = create(:cart_detail, cart_id: @cart.id)
          }

          it "ok(200)がレスポンスされる" do
            subject
            expect(response).to have_http_status(:ok)
          end

          it "注文履歴が保存される" do
            expect { subject }.to change { Order.count }.by(1)
          end

          it "注文詳細詳細情報が保存される" do
            expect { subject }.to change { OrderDetail.count }.by(1)
          end

          it "カートは削除される" do
            expect { subject }.to change { Cart.count }.by(-1)
          end

          it "カート詳細情報は削除される" do
            expect { subject }.to change { CartDetail.count }.by(-1)
          end
        end

        context "カートは存在するが、カート詳細が存在しないとき" do
          before {
            create(:cart, user_id: current_user.id)
          }

          it "no_content(204)がレスポンスされる" do
            subject
            expect(response).to have_http_status(:no_content)
          end
        end

        context "カートとカート詳細が存在しないとき" do
          it "no_content(204)がレスポンスされる" do
            subject
            expect(response).to have_http_status(:no_content)
          end
        end
      end

      context "paramsのユーザーIDがログインユーザーと違うとき" do
        before {
          @cart = create(:cart, user_id: current_user.id)
          @cart_details = create(:cart_detail, cart_id: @cart.id)
          @other_user = create(:user)
        }

        let(:order_params) { { user_id: @other_user.id } }

        it "no_content(204)がレスポンスされる" do
          subject
          expect(response).to have_http_status(:no_content)
        end
      end
    end

    context "トークン認証情報がない場合" do
      subject { post(api_v1_carts_path, params: order_params) }

      before {
        @cart = create(:cart, user_id: current_user.id)
        @cart_details = create(:cart_detail, cart_id: @cart.id)
      }

      it "認証不可(401)がレスポンスされる" do
        subject
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
