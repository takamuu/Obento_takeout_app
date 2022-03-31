require "rails_helper"

RSpec.describe CartDetail, type: :model do
  describe "動作チェック" do
    subject { cart_detail.valid? }

    context "データが条件を満たす時" do
      let(:cart_detail) { build(:cart_detail) }
      it "保存できる" do
        expect(subject).to eq true
      end
    end
  end
end
