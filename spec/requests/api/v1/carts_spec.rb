require "rails_helper"

RSpec.describe "Api::V1::Carts", type: :request do
  let(:current_user) { create(:user) }
  let(:headers) { current_user.create_new_auth_token }
  let(:user) { create(:user) }

  describe "GET #index" do
    context "トークン認証情報がある場合" do
      subject { get(api_v1_carts_path, headers: headers) }

      context "カートが存在する場合 && カート詳細が存在する場合" do
        before {
          create(:cart, user_id: current_user.id)
          create(:cart_detail, cart_id: current_user.cart.id)
        }

        it "ok(200)がレスポンスされる" do
          subject
          expect(response).to have_http_status(:ok)
        end

        it "取得したカートがレスポンスされる" do
          subject
          json = JSON.parse(response.body)
          expect(json[0]["food"]["name"]).to be_present
          expect(json[0]["count"]).to be_present
          expect(json[0]["food"]["price"]).to be_present
        end
      end

      context "カートが存在する場合 && カート詳細が存在しない場合" do
        before { create(:cart, user_id: current_user.id) }

        it "no_content(204)がレスポンスされる" do
          subject
          expect(response).to have_http_status(:no_content)
        end
      end

      context "カートが存在しない場合" do
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
    let(:food_params) { { food_id: @cart_details.food.id, count: 1 } }

    context "トークン認証情報がある場合" do
      subject { post(api_v1_carts_path, params: food_params, headers: headers) }

      context "カートが存在する場合 && 追加するフードが他のレストランの場合" do
        before {
          @food = create(:food)
          @other_food = create(:food)
          @cart = create(:cart, user_id: current_user.id)
          @cart_details = create(:cart_detail, food_id: @food.id, cart_id: current_user.cart.id)
        }

        let(:food_params) { { food_id: @other_food.id, count: 1 } }

        it "not_acceptable(406)がレスポンスされる" do
          subject
          expect(response).to have_http_status(:not_acceptable)
        end

        it "カートが更新されない" do
          expect { subject }.not_to change { Cart.count }
        end

        it "カート詳細が作成されない" do
          expect { subject }.not_to change { CartDetail.count }
        end
      end

      context "カートが存在する && 追加するフードがカート詳細に含まれている場合" do
        before {
          @cart = create(:cart, user_id: current_user.id)
          @cart_details = create(:cart_detail, cart_id: current_user.cart.id)
          @other_food_details = create(:cart_detail, cart_id: current_user.cart.id)
        }

        it "ok(200)がレスポンスされる" do
          subject
          expect(response).to have_http_status(:ok)
        end

        it "カートが更新される" do
          expect { subject }.to change { @cart.reload.total_price }.from(0).to(3000)
        end

        it "カート詳細が更新される" do
          expect { subject }.to change { @cart_details.reload.count }.from(1).to(2)
        end
      end

      context "カートが存在する場合 && 追加するフードがカート詳細に含まれていない場合" do
        before {
          @restaurant = create(:restaurant)
          @food = create(:food, restaurant_id: @restaurant.id)
          @other_food = create(:food, restaurant_id: @restaurant.id)
          @cart = create(:cart, user_id: current_user.id)
          @cart_details = create(:cart_detail, food_id: @food.id, cart_id: @cart.id)
        }

        let(:food_params) { { food_id: @other_food.id, count: 1 } }

        it "ok(200)がレスポンスされる" do
          subject
          expect(response).to have_http_status(:ok)
        end

        it "カートが更新される" do
          expect { subject }.to change { @cart.reload.total_price }.from(0).to(2000)
        end

        it "カート詳細が作成される" do
          expect { subject }.to change { @cart.reload.cart_details.count }.from(1).to(2)
        end
      end

      context "カートが存在する場合 && カート詳細が存在しない場合" do
        before {
          @food = create(:food)
          @cart = create(:cart, user_id: current_user.id)
        }

        let(:food_params) { { food_id: @food.id, restaurant_id: @food.restaurant.id, count: 1 } }

        it "ok(200)がレスポンスされる" do
          subject
          expect(response).to have_http_status(:ok)
        end

        it "カートが更新される" do
          expect { subject }.to change { @cart.reload.total_price }.from(0).to(1000)
        end

        it "カート詳細が作成される" do
          expect { subject }.to change { CartDetail.count }.by(1)
        end
      end

      context "カートが存在しない場合" do
        let(:food_params) { { food_id: @food.id, restaurant_id: @food.restaurant.id, count: 1 } }

        before { @food = create(:food) }

        it "ok(200)がレスポンスされる" do
          subject
          expect(response).to have_http_status(:ok)
        end

        it "カートが作成される" do
          expect { subject }.to change { Cart.count }.by(1)
        end

        it "カート詳細が作成される" do
          expect { subject }.to change { CartDetail.count }.by(1)
        end
      end
    end

    context "トークン認証がない場合" do
      subject { post(api_v1_carts_path, params: food_params) }

      before { @food = create(:food) }

      let(:food_params) { { food_id: @food.id, restaurant_id: 1, count: 1 } }

      it "認証不可(401)がレスポンスされる" do
        subject
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
