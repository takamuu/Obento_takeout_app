require "rails_helper"

RSpec.describe "Api::V1::Auth::Registrations", type: :request do
  # 新規登録
  describe "POST /api/v1/auth" do
    subject { post(api_v1_user_registration_path, params: params) }

    context "パラメータが妥当な場合" do
      let(:params) { attributes_for(:user) }
      it "新規登録ができること" do
        expect { subject }.to change { User.count }.by(1)
        expect(response).to have_http_status(:ok)
        res = JSON.parse(response.body)
        expect(res["data"]["email"]).to eq(User.last.email)
      end

      it "本人認証として使用されるheader情報を取得することができること" do
        subject
        header = response.header
        expect(header["access-token"]).to be_present
        expect(header["client"]).to be_present
        expect(header["expiry"]).to be_present
        expect(header["uid"]).to be_present
        expect(header["token-type"]).to be_present
      end
    end

    context "パラメータが不正な場合" do
      context "emailが存在しないとき" do
        let(:params) { attributes_for(:user, email: nil) }
        it "エラーが発生する" do
          expect { subject }.to change { User.count }.by(0)
          res = JSON.parse(response.body)
          expect(response).to have_http_status(:unprocessable_entity)
          expect(res["errors"]["email"][0]).to include "を入力してください"
        end
      end

      context "passwordが存在しないとき" do
        let(:params) { attributes_for(:user, password: nil) }
        it "エラーが発生する" do
          expect { subject }.to change { User.count }.by(0)
          res = JSON.parse(response.body)
          expect(response).to have_http_status(:unprocessable_entity)
          expect(res["errors"]["password"][0]).to include "を入力してください"
        end
      end
    end
  end

  describe "PATCH api/v1/auth/registrations#update" do
    subject { put(api_v1_user_registration_path(account_update_params), headers: headers) }

    let(:headers) { @current_user.create_new_auth_token }
    let(:account_update_params) {
      { user:
        {
          id: @current_user.id,
          name: @new_user.name,
          kana: @new_user.kana,
          phone_number: @new_user.phone_number,
        } }
    }

    before do
      @current_user = create(:user)
      @new_user = create(:user)
    end

    context "パラメータが正常な場合" do
      it "ok(200)がレスポンスされる" do
        subject
        expect(response).to have_http_status(:ok)
      end

      it "name が更新される" do
        origin_name = @current_user.name
        new_name = account_update_params[:user][:name]
        expect { subject }.to change { @current_user.reload.name }.from(origin_name).to(new_name)
      end

      it "kana が更新される" do
        origin_kana = @current_user.kana
        new_kana = account_update_params[:user][:kana]
        expect { subject }.to change { @current_user.reload.kana }.from(origin_kana).to(new_kana)
      end

      it "phone_number が更新される" do
        origin_phone_number = @current_user.phone_number
        new_phone_number = account_update_params[:user][:phone_number]
        expect { subject }.to change { @current_user.reload.phone_number }.from(origin_phone_number).to(new_phone_number)
      end
    end

    context "トークン認証情報がない場合" do
      subject { patch(api_v1_user_registration_path(account_update_params)) }

      it "認証不可(404)がレスポンスされる" do
        subject
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe "DELETE api/v1/auth/registrations#destroy" do
    subject { delete(api_v1_user_registration_path, headers: headers) }

    let(:headers) { @current_user.create_new_auth_token }
    let(:sign_up_params) {
      { user:
        { id: @current_user.id } }
    }
    before { @current_user = create(:user) }

    context "パラメータが正常な場合" do
      it "ok(200)がレスポンスされる" do
        subject
        expect(response).to have_http_status(:ok)
      end

      it "ユーザーが削除される" do
        expect { subject }.to change { User.count }.from(1).to(0)
      end
    end

    context "トークン認証情報がない場合" do
      subject { delete(api_v1_user_registration_path) }

      it "認証不可(404)がレスポンスされる" do
        subject
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
