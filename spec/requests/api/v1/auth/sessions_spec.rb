require "rails_helper"

RSpec.describe "Api::V1::Auth::Sessions", type: :request do
  let(:current_user) { create(:user) }
  let(:headers) { current_user.create_new_auth_token }

  # サインイン
  describe "POST /api/v1/auth/sign_in" do
    subject { post(api_v1_user_session_path, params: params) }
    before { @user = create(:user) }

    context "ユーザーのemailとpasswordが一致している時" do
      let(:params) { { email: @user.email, password: @user.password } }
      it "ログインできること" do
        subject
        expect(response).to have_http_status(:ok)
        header = response.header
        expect(header["access-token"]).to be_present
        expect(header["client"]).to be_present
        expect(header["expiry"]).to be_present
        expect(header["uid"]).to be_present
        expect(header["token-type"]).to be_present
      end
    end

    context "ユーザーemailとpasswordが一致しない時" do
      let(:params) { { email: @user.email, password: "password" } }
      it "エラーが発生する" do
        subject
        expect(response).to have_http_status(:unauthorized)
        header = response.header
        expect(header["access-token"]).to be_falsey
        expect(header["client"]).to be_falsey
        expect(header["expiry"]).to be_falsey
        expect(header["uid"]).to be_falsey
        expect(header["token-type"]).to be_falsey
      end
    end
  end

  # サインアウト
  describe "DELETE /api/v1/auth/sign_out" do
    subject { delete(destroy_api_v1_user_session_path, headers: headers) }

    context "パラメータが正しい場合" do
      it "ログアウトできる" do
        subject
        expect(response).to have_http_status(:ok)
        header = response.header
        expect(header["access-token"]).to be_falsey
        expect(header["client"]).to be_falsey
        expect(header["expiry"]).to be_falsey
        expect(header["uid"]).to be_falsey
        expect(header["token-type"]).to be_falsey
      end
    end

    context "パラメータが不正な場合" do
      let(:headers) { nil }
      it "エラーが発生する" do
        subject
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
