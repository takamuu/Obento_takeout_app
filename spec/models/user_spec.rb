require "rails_helper"

RSpec.describe User, type: :model do
  describe "バリデーションのチェック" do
    subject { user.valid? }

    context "データが条件を満たすとき" do
      let(:user) { build(:user) }
      it "保存できる" do
        expect(subject).to eq true
      end
    end

    context "name が空のとき" do
      let(:user) { build(:user, name: "") }
      it "エラーが発生する" do
        expect(subject).to eq false
        expect(user.errors.messages[:name]).to include "を入力してください"
      end
    end

    context "kana が空のとき" do
      let(:user) { build(:user, kana: "") }
      it "エラーが発生する" do
        expect(subject).to eq false
        expect(user.errors.messages[:kana]).to include "を入力してください"
      end
    end

    context "email が空のとき" do
      let(:user) { build(:user, email: "") }
      it "エラーが発生する" do
        expect(subject).to eq false
        expect(user.errors.messages[:email]).to include "を入力してください"
      end
    end

    context "email が256文字以上のとき" do
      let(:user) { build(:user, email: "a" * 256) }
      it "エラーが発生する" do
        expect(subject).to eq false
        expect(user.errors.messages[:email]).to include "は255文字以内で入力してください"
      end
    end

    context "email がすでに存在するとき" do
      before { create(:user, email: "test@example.com") }

      let(:user) { build(:user, email: "test@example.com") }
      it "エラーが発生する" do
        expect(subject).to eq false
        expect(user.errors.messages[:email]).to include "はすでに存在します"
      end
    end

    context "email が アルファベット･英数字 のみのとき" do
      let(:user) { build(:user, email: Faker::Lorem.characters(number: 16)) }
      it "エラーが発生する" do
        expect(subject).to eq false
        expect(user.errors.messages[:email]).to include "は不正な値です"
      end
    end

    context "phone_number が空のとき" do
      let(:user) { build(:user, phone_number: "") }
      it "エラーが発生する" do
        expect(subject).to eq false
        expect(user.errors.messages[:phone_number]).to include "を入力してください"
      end
    end
  end
end
