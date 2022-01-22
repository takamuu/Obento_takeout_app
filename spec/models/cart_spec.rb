require "rails_helper"

RSpec.describe Cart, type: :model do
  describe "バリデーションのチェック" do
    subject { cart.valid? }

    context "データが条件を満たす時" do
      let(:cart) { build(:cart) }
      it "保存できる" do
        expect(subject).to eq true
      end
    end

    context "カートが削除されたとき" do
      subject { @cart.destroy }

      before {
        @cart = create(:cart)
        create_list(:cart_detail, 2, cart_id: @cart.id)
      }

      it "カート詳細も削除される" do
        expect { subject }.to change { @cart.cart_details.count }.by(-2)
      end
    end
  end
end
