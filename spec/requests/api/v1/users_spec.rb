require "rails_helper"

RSpec.describe "Api::V1::Users", type: :request do
  let(:current_user) { create(:user) }
  let(:headers) { current_user.create_new_auth_token }
  let(:user) { create(:user) }

  describe "GET #show" do
    let(:user_params) {
      { user:
        {  id: current_user.id,
           name: current_user.name,
           email: current_user.email,
           password: current_user.password,
           kana: current_user.kana,
           phone_number: current_user.phone_number }, id: current_user.id }
    }
    context "トークン認証情報がある場合" do
      subject { get(api_v1_user_path(user_params), headers: headers) }

      context "ユーザーが存在する場合" do
        it "ok(200)がレスポンスされる" do
          subject
          expect(response).to have_http_status(:ok)
        end

        it "取得したユーザー情報がレスポンスされる" do
          subject
          json = JSON.parse(response.body)
          expect(json.keys).to eq %w[id name email kana phone_number]
        end
      end

      context ":idに対応するユーザーが存在しないとき" do
        let(:user_params) { { user: { id: 1 }, id: 1 } }

        it "no_content(204)がレスポンスされる" do
          subject
          expect(response).to have_http_status(:no_content)
        end
      end
    end

    context "トークン認証情報がない場合" do
      subject { get(api_v1_user_path(user_params)) }

      it "認証不可(401)がレスポンスされる" do
        subject
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
