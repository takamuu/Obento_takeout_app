require "rails_helper"

RSpec.describe Order, type: :model do
  describe "動作チェック" do
    subject { order.valid? }

    context "データが条件を満たす時" do
      let(:order) { build(:order) }
      it "保存できる" do
        expect(subject).to eq true
      end
    end

    context "ユーザーが削除されたとき" do
      subject { @user.destroy }

      before {
        @user = create(:user)
        @order = create(:order, user_id: @user.id)
        create_list(:order_detail, 2, order_id: @order.id)
      }

      it "購入履歴も削除される" do
        expect { subject }.to change { @user.orders.count }.by(-1)
      end

      it "購入履歴詳細も削除される" do
        expect { subject }.to change { @user.order_details.count }.by(-2)
      end
    end
  end
end
