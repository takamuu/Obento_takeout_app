require "rails_helper"

RSpec.describe OrderDetail, type: :model do
  describe "バリデーションのチェック" do
    subject { order_detail.valid? }

    context "データが条件を満たす時" do
      let(:order_detail) { build(:order_detail) }
      it "保存できる" do
        expect(subject).to eq true
      end
    end
  end
end
